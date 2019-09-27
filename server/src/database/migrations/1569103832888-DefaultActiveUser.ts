import { MigrationInterface, QueryRunner } from 'typeorm';

import { UserEntity } from '../../modules/user/user.entity';

export class DefaultActiveUser1569103832888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.connection.getRepository(UserEntity).save({
      email: 'admin@admin.com',
      password: 'password',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
