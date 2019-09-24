import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { UploadService } from './upload.service';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyEntity } from './company.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    MulterModule.registerAsync({
      useClass: UploadService,
    }),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, UploadService],
  exports: [CompanyService],
})
export class CompanyModule {}
