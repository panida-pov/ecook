import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecipesTable1716362848002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS recipes (
            id              BIGINT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name            VARCHAR(50) NOT NULL,
            favorite        TINYINT(1) DEFAULT 0 NOT NULL,
            servings        BIGINT(10) DEFAULT 1 NOT NULL
        )
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DROP TABLE IF EXISTS recipes
      `
    );
  }
}
