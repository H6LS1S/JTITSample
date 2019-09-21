import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultActiveUser1569103832888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO User(id, email, password, createAt, updateAt) VALUES (DEFAULT, 'admin@admin.com', 'password', DEFAULT, DEFAULT)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
