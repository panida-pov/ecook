import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLabelsTable1716365291192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS labels (
            id              BIGINT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name            VARCHAR(50) NOT NULL
        )
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DROP TABLE IF EXISTS labels
      `
    );
  }
}
