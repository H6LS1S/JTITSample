import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

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
