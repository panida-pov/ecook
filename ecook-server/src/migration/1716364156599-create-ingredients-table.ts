import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIngredientsTable1716364156599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS ingredients (
            id              BIGINT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name            VARCHAR(50) NOT NULL,
            amount          BIGINT(10) NOT NULL,
            unit            VARCHAR(50) NOT NULL,
            recipe_id       BIGINT(10),
            FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
        )
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DROP TABLE IF EXISTS ingredients
      `
    );
  }
}
