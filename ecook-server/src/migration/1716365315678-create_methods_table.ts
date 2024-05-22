import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMethodsTable1716365315678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS methods (
            id              BIGINT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            method          TEXT NOT NULL,
            recipe_id       BIGINT(10),
            FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
        )
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DROP TABLE IF EXISTS methods
      `
    );
  }
}
