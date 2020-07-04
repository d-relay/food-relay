import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUser1593455538306 implements MigrationInterface {
    name = 'UpdateUser1593455538306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d72ea127f30e21753c9e229891e"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userId" TO "locationId"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "REL_d72ea127f30e21753c9e229891" TO "UQ_93e37a8413a5745a9b52bc3c0c1"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_93e37a8413a5745a9b52bc3c0c1" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_93e37a8413a5745a9b52bc3c0c1"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_93e37a8413a5745a9b52bc3c0c1" TO "REL_d72ea127f30e21753c9e229891"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "locationId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d72ea127f30e21753c9e229891e" FOREIGN KEY ("userId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
