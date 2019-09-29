import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { EmployeeEntity } from '../employee.entity';

export class EmployeeRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiModelProperty({ example: 'John' })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiModelProperty({ example: 'Dou' })
  readonly lastName: string;

  @IsEmail()
  @ApiModelProperty({ example: 'example@google.com' })
  readonly email: string;

  @IsPhoneNumber('')
  @ApiModelProperty({ example: '+1-541-754-3010' })
  readonly phone: string;

  @ApiModelProperty({ example: 1 })
  company: any;
}

export class EmployeesResponseDTO {
  items: EmployeeEntity[];
  pages: number;
}

export class EmployeesRequestDTO {
  @IsString()
  @ApiModelProperty({ example: '1', default: '1' })
  readonly page: string = '1';

  @IsString()
  @ApiModelProperty({ example: '10', default: '10' })
  readonly limit: string = '10';
}
