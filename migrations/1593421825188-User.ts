import {MigrationInterface, QueryRunner} from "typeorm";

export class User1593421825188 implements MigrationInterface {
    name = 'User1593421825188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" BIGSERIAL NOT NULL, "geography" point NOT NULL, "zipcode" integer NOT NULL, "country" character varying(255) NOT NULL, "region" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "client_id" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "login" character varying(255) NOT NULL, "sign_in_count" integer NOT NULL DEFAULT 0, "current_sign_in_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "last_sign_in_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" bigint, CONSTRAINT "UQ_fed09e6f9c08a5031ba1e3e9701" UNIQUE ("client_id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "REL_d72ea127f30e21753c9e229891" UNIQUE ("userId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d72ea127f30e21753c9e229891e" FOREIGN KEY ("userId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d72ea127f30e21753c9e229891e"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
