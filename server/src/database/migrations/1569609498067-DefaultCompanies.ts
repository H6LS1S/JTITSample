import { MigrationInterface, QueryRunner } from 'typeorm';
import { company, internet } from 'faker';

import { CompanyRequestDTO } from '../../modules/company/dto/company.dto';
import { CompanyEntity } from '../../modules/company/company.entity';
import { UserEntity } from '../../modules/user/user.entity';

export class DefaultCompanies1569609498067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const owner = await queryRunner.connection
      .getRepository(UserEntity)
      .findOne(1);

    class BaseCompany implements CompanyRequestDTO {
      name: string = company.companyName();
      email: string = internet.exampleEmail();
      website: string = internet.url();
      owner: UserEntity = owner;
    }

    const companies = new Array(50).fill('').map(() => new BaseCompany());
    return await queryRunner.connection
      .getRepository(CompanyEntity)
      .save(companies);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
