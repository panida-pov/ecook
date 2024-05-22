import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecipeLabelTable1716365352414 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE IF NOT EXISTS recipe_label (
            id              BIGINT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            recipe_id       BIGINT(10),
            label_id        BIGINT(10),
            FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
            FOREIGN KEY (label_id) REFERENCES labels(id) ON DELETE CASCADE
        )
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DROP TABLE IF EXISTS recipe_label
      `
    );
  }
}
