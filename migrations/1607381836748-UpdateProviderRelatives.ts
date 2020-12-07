import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProviderRelatives1607381836748 implements MigrationInterface {
    name = 'UpdateProviderRelatives1607381836748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_da1c78142007c621b5498c818c1"`);
        await queryRunner.query(`COMMENT ON COLUMN "provider"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "REL_da1c78142007c621b5498c818c"`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_da1c78142007c621b5498c818c1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_da1c78142007c621b5498c818c1"`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "REL_da1c78142007c621b5498c818c" UNIQUE ("userId")`);
        await queryRunner.query(`COMMENT ON COLUMN "provider"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_da1c78142007c621b5498c818c1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
