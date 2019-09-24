import { Param, Query, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Post, Get, Patch, Put, Delete } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as imageSize from 'buffer-image-size';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';

import { CompanyRequestDTO, CompaniesRequestDTO } from './dto/company.dto';
import { CompanyService } from './company.service';
import { UploadService } from './upload.service';
import { CompanyEntity } from './company.entity';

@ApiUseTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createOne(
    @User() owner: UserEntity,
    @Body() payload: CompanyRequestDTO,
  ): Promise<CompanyEntity> {
    return await this.companyService.createOne(payload, owner).catch(() => {
      throw new HttpException(`Company already exists`, HttpStatus.CONFLICT);
    });
  }

  @Get()
  async selectAll(
    @Query() options: CompaniesRequestDTO,
  ): Promise<CompanyEntity[]> {
    return await this.companyService.selectAll({
      take: Number(options.limit),
      skip: Number(options.limit) * Number(options.page),
    });
  }

  @Get(':id')
  async selectOne(@Param('id') id: number): Promise<CompanyEntity> {
    return await this.companyService.selectOneByID(id).catch(() => {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    });
  }

  @Put(':id/logotype')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'logotype', required: true })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('logotype'))
  async uploadFile(@Param('id') id: number, @UploadedFile() logotype: any) {
    const company = await this.companyService.selectOneByID(id).catch(() => {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    });
    const { width, height } = imageSize(logotype.buffer);

    if (width > 100 && height > 100) {
      company.logotype = this.uploadService.saveFile(logotype);
      return await this.companyService.updateOne(company, company).catch(() => {
        throw new HttpException(`Company conflict`, HttpStatus.CONFLICT);
      });
    }
    throw new HttpException(`Small logotype`, HttpStatus.BAD_REQUEST);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateOne(
    @Param('id') id: number,
    @Body() payload: CompanyRequestDTO,
  ): Promise<CompanyEntity> {
    const company = await this.companyService.selectOneByID(id).catch(() => {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    });

    return await this.companyService.updateOne(company, payload).catch(() => {
      throw new HttpException(`Company conflict`, HttpStatus.CONFLICT);
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Param('id') id: number): Promise<any> {
    const company = await this.companyService.selectOneByID(id).catch(() => {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    });

    return await this.companyService.deleteOne(company.id).catch(() => {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    });
  }
}
