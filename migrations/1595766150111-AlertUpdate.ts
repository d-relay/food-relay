import {MigrationInterface, QueryRunner} from "typeorm";

export class AlertUpdate1595766150111 implements MigrationInterface {
    name = 'AlertUpdate1595766150111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alert" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "alert" ADD "message" character varying(50) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alert" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "alert" ADD "message" character varying NOT NULL DEFAULT ''`);
    }

}
