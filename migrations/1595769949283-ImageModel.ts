import { MigrationInterface, QueryRunner } from 'typeorm'

export class ImageModel1595769949283 implements MigrationInterface {
    name = 'ImageModel1595769949283'

    public async up (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('CREATE TABLE "image" ("id" BIGSERIAL NOT NULL, "filename" character varying(50) NOT NULL DEFAULT \'\', CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))')
    	await queryRunner.query('ALTER TABLE "alert" ADD "imageId" bigint')
    	await queryRunner.query('ALTER TABLE "alert" ADD CONSTRAINT "UQ_48e6a5b61c5eaa4302fb5adc666" UNIQUE ("imageId")')
    	await queryRunner.query('ALTER TABLE "alert" ADD CONSTRAINT "FK_48e6a5b61c5eaa4302fb5adc666" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('ALTER TABLE "alert" DROP CONSTRAINT "FK_48e6a5b61c5eaa4302fb5adc666"')
    	await queryRunner.query('ALTER TABLE "alert" DROP CONSTRAINT "UQ_48e6a5b61c5eaa4302fb5adc666"')
    	await queryRunner.query('ALTER TABLE "alert" DROP COLUMN "imageId"')
    	await queryRunner.query('DROP TABLE "image"')
    }
}
