import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateLocation1594045643759 implements MigrationInterface {
    name = 'UpdateLocation1594045643759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "house"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "house" character varying(4)`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "corps"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "corps" character varying(4)`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "entrance"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "entrance" character varying(4)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "entrance"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "entrance" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "corps"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "corps" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "house"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "house" character varying(10)`);
    }

}
