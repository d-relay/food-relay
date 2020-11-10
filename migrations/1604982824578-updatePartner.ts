import { MigrationInterface, QueryRunner } from 'typeorm'

export class updatePartner1604982824578 implements MigrationInterface {
    name = 'updatePartner1604982824578'

    public async up (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('ALTER TABLE "partner" DROP CONSTRAINT "FK_1e1b4185b1639feb821388500db"')
    	await queryRunner.query('ALTER TABLE "partner" ADD CONSTRAINT "FK_1e1b4185b1639feb821388500db" FOREIGN KEY ("logoId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('ALTER TABLE "partner" DROP CONSTRAINT "FK_1e1b4185b1639feb821388500db"')
    	await queryRunner.query('ALTER TABLE "partner" ADD CONSTRAINT "FK_1e1b4185b1639feb821388500db" FOREIGN KEY ("logoId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }
}
