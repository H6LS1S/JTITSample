import { Param, Query, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Post, Get, Patch, Delete } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import {
  EmployeeRequestDTO,
  EmployeesRequestDTO,
  EmployeesResponseDTO,
} from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';

import { CompanyService } from '../company/company.service';

@ApiUseTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createOne(
    @Body() payload: EmployeeRequestDTO,
  ): Promise<EmployeeEntity> {
    payload.company = await this.companyService
      .selectOneByID(payload.company)
      .catch(() => {
        throw new HttpException(`Employee already exists`, HttpStatus.CONFLICT);
      });

    return await this.employeeService.createOne(payload).catch(() => {
      throw new HttpException(`Employee already exists`, HttpStatus.CONFLICT);
    });
  }

  @Get()
  async selectAll(
    @Query() options: EmployeesRequestDTO,
  ): Promise<EmployeesResponseDTO> {
    const [items, countAll] = await this.employeeService.selectAll({
      take: Number(options.limit),
      skip: Number(options.limit) * Number(options.page),
    });

    return {
      items,
      pages: Math.floor((countAll - 1) / Number(options.limit)),
    };
  }

  @Get(':id')
  async selectOne(@Param('id') id: number): Promise<EmployeeEntity> {
    return await this.employeeService.selectOneByID(id).catch(() => {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateOne(
    @Param('id') id: number,
    @Body() payload: EmployeeRequestDTO,
  ): Promise<EmployeeEntity> {
    const employee = await this.employeeService.selectOneByID(id).catch(() => {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    });

    return await this.employeeService.updateOne(employee, payload).catch(() => {
      throw new HttpException(`Employee conflict`, HttpStatus.CONFLICT);
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Param('id') id: number): Promise<any> {
    const employee = await this.employeeService.selectOneByID(id).catch(() => {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    });

    return await this.employeeService.deleteOne(employee.id).catch(() => {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    });
  }
}
