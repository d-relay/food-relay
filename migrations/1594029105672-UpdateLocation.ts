import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateLocation1594029105672 implements MigrationInterface {
    name = 'UpdateLocation1594029105672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "zipcode"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "house" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "location" ADD "corps" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "location" ADD "entrance" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "location" ADD "floor" character varying(4)`);
        await queryRunner.query(`ALTER TABLE "location" ADD "flat" character varying(4)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "current_sign_in_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_sign_in_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_sign_in_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "current_sign_in_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "flat"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "floor"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "entrance"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "corps"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "house"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "zipcode" integer`);
    }

}
