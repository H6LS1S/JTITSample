import {
  IsUrl,
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CompanyRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiModelProperty({ example: 'Company & co.' })
  readonly name: string;

  @IsEmail()
  @ApiModelProperty({ example: 'example@google.com' })
  readonly email: string;

  @IsUrl()
  @MaxLength(255)
  @ApiModelProperty({ example: 'https://company.example.com' })
  readonly website: string;
}

export class CompaniesRequestDTO {
  @IsString()
  @ApiModelProperty({ example: '0', default: '0' })
  readonly page: string = '0';

  @IsString()
  @ApiModelProperty({ example: '0', default: '10' })
  readonly limit: string = '10';
}
