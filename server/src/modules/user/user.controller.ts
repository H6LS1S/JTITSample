import { Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';

import { UserRequestDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createOne(@Body() payload: UserRequestDTO): Promise<UserEntity> {
    return await this.userService.createOne(payload).catch(() => {
      throw new HttpException(`User already exists`, HttpStatus.CONFLICT);
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async selectOne(@User() payload: UserEntity): Promise<UserEntity> {
    return await payload;
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateOne(
    @User() user: UserEntity,
    @Body() payload: UserRequestDTO,
  ): Promise<UserEntity> {
    return await this.userService.updateOne(user, payload).catch(() => {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    });
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@User() payload: UserEntity): Promise<any> {
    return await this.userService.deleteOne(payload).catch(() => {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    });
  }
}
