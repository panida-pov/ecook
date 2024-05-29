import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintToLabelsTable1716961799883
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE labels
        ADD CONSTRAINT UC_labels UNIQUE (name);
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE labels
        DROP INDEX UC_labels;
      `
    );
  }
}
