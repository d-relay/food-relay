import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlertUpdate1595763611077 implements MigrationInterface {
    name = 'AlertUpdate1595763611077'

    public async up (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('ALTER TABLE "alert" DROP COLUMN "shadow"')
    	await queryRunner.query('ALTER TABLE "alert" DROP COLUMN "stroke"')
    	await queryRunner.query('ALTER TABLE "alert" ADD "message" character varying NOT NULL DEFAULT \'\'')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('ALTER TABLE "alert" DROP COLUMN "message"')
    	await queryRunner.query('ALTER TABLE "alert" ADD "stroke" smallint NOT NULL DEFAULT 0')
    	await queryRunner.query('ALTER TABLE "alert" ADD "shadow" smallint NOT NULL DEFAULT 0')
    }
}
