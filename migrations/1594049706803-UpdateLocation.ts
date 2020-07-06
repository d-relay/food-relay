import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateLocation1594049706803 implements MigrationInterface {
    name = 'UpdateLocation1594049706803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ADD "street" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "street"`);
    }

}
