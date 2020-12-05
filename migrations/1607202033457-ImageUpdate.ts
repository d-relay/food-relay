import {MigrationInterface, QueryRunner} from "typeorm";

export class ImageUpdate1607202033457 implements MigrationInterface {
    name = 'ImageUpdate1607202033457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "imageType"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "imageableId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ADD "imageableType" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "imageableType"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "imageableId"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "imageType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ADD "imageId" integer NOT NULL`);
    }

}
