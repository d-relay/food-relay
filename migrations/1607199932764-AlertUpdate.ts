import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlertUpdate1607199932764 implements MigrationInterface {
    name = 'AlertUpdate1607199932764'

    public async up (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('COMMENT ON COLUMN "alert"."font_size" IS NULL')
    	await queryRunner.query('ALTER TABLE "alert" ALTER COLUMN "font_size" SET DEFAULT \'14\'')
    	await queryRunner.query('COMMENT ON COLUMN "alert"."message" IS NULL')
    	await queryRunner.query('ALTER TABLE "alert" ALTER COLUMN "message" SET DEFAULT \'Hello there\'')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('ALTER TABLE "alert" ALTER COLUMN "message" SET DEFAULT \'\'')
    	await queryRunner.query('COMMENT ON COLUMN "alert"."message" IS NULL')
    	await queryRunner.query('ALTER TABLE "alert" ALTER COLUMN "font_size" SET DEFAULT \'0\'')
    	await queryRunner.query('COMMENT ON COLUMN "alert"."font_size" IS NULL')
    }
}
