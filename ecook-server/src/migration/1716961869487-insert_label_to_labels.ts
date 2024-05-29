import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertLabelToLabels1716961869487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO labels (name) VALUES
          ('thai'),
          ('asian'),
          ('western'),
          ('dessert')
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      DELETE FROM labels WHERE name IN (
        'thai',
        'asian',
        'western',
        'dessert'
      );
    `
    );
  }
}
