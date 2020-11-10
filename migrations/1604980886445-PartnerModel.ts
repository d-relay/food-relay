import { MigrationInterface, QueryRunner } from 'typeorm'

export class PartnerModel1604980886445 implements MigrationInterface {
    name = 'PartnerModel1604980886445'

    public async up (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('CREATE TABLE "partner" ("id" BIGSERIAL NOT NULL, "name" character varying(20) NOT NULL, "min_limit" smallint NOT NULL DEFAULT \'400\', "logoId" bigint, CONSTRAINT "REL_1e1b4185b1639feb821388500d" UNIQUE ("logoId"), CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))')
    	await queryRunner.query('ALTER TABLE "partner" ADD CONSTRAINT "FK_1e1b4185b1639feb821388500db" FOREIGN KEY ("logoId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('ALTER TABLE "partner" DROP CONSTRAINT "FK_1e1b4185b1639feb821388500db"')
    	await queryRunner.query('DROP TABLE "partner"')
    }
}
