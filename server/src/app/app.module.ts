import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';

import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { CompanyModule } from '../modules/company/company.module';
import { EmployeeModule } from '../modules/employee/employee.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    CompanyModule,
    EmployeeModule,
  ],
})
export class AppModule {}
