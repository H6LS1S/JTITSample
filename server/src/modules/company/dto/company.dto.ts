import {
  IsUrl,
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

import { CompanyEntity } from '../company.entity';

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

export class CompaniesResponseDTO {
  items: CompanyEntity[];
  pages: number;
}

export class CompaniesRequestDTO {
  @IsString()
  @ApiModelProperty({ example: '1', default: '1' })
  readonly page: string = '1';

  @IsString()
  @ApiModelProperty({ example: '10', default: '10' })
  readonly limit: string = '10';
}
