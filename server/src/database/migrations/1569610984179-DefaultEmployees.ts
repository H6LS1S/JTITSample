import { MigrationInterface, QueryRunner } from 'typeorm';
import { internet, helpers, name } from 'faker';

import { EmployeeRequestDTO } from '../../modules/employee/dto/employee.dto';
import { EmployeeEntity } from '../../modules/employee/employee.entity';
import { CompanyEntity } from '../../modules/company/company.entity';

export class DefaultEmployees1569610984179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const companies = await queryRunner.connection
      .getRepository(CompanyEntity)
      .find();

    class BaseEmployee implements EmployeeRequestDTO {
      constructor(company: CompanyEntity) {
        this.company = company;
      }

      firstName: string = name.findName();
      lastName: string = name.lastName();
      email: string = internet.email();
      phone: string = '+38097' + helpers.replaceSymbolWithNumber('#######');
      company: CompanyEntity;
    }

    const employees = companies.map(company => new BaseEmployee(company));
    return await queryRunner.connection
      .getRepository(EmployeeEntity)
      .save(employees);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
