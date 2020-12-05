import {MigrationInterface, QueryRunner} from "typeorm";

export class ImageUpdate1607201617540 implements MigrationInterface {
    name = 'ImageUpdate1607201617540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "FK_48e6a5b61c5eaa4302fb5adc666"`);
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "FK_1e1b4185b1639feb821388500db"`);
        await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "UQ_48e6a5b61c5eaa4302fb5adc666"`);
        await queryRunner.query(`ALTER TABLE "alert" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "REL_1e1b4185b1639feb821388500d"`);
        await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "logoId"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "imageId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ADD "imageType" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "imageType"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "partner" ADD "logoId" bigint`);
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "REL_1e1b4185b1639feb821388500d" UNIQUE ("logoId")`);
        await queryRunner.query(`ALTER TABLE "alert" ADD "imageId" bigint`);
        await queryRunner.query(`ALTER TABLE "alert" ADD CONSTRAINT "UQ_48e6a5b61c5eaa4302fb5adc666" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "FK_1e1b4185b1639feb821388500db" FOREIGN KEY ("logoId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alert" ADD CONSTRAINT "FK_48e6a5b61c5eaa4302fb5adc666" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
