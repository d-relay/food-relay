import { MigrationInterface, QueryRunner } from 'typeorm'

export class ReinitModels1594641929061 implements MigrationInterface {
    name = 'ReinitModels1594641929061'

    public async up (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "client_id" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "login" character varying(255) NOT NULL, "sign_in_count" integer NOT NULL DEFAULT 0, "current_sign_in_at" TIMESTAMP NOT NULL DEFAULT now(), "last_sign_in_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fed09e6f9c08a5031ba1e3e9701" UNIQUE ("client_id"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))')
    	await queryRunner.query('CREATE TABLE "alert" ("alert_token" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" BIGSERIAL NOT NULL, "color" character varying(7) NOT NULL DEFAULT \'#000000\', "font_size" smallint NOT NULL DEFAULT 0, "shadow" smallint NOT NULL DEFAULT 0, "stroke" smallint NOT NULL DEFAULT 0, "duration" smallint NOT NULL DEFAULT 5, "interval" smallint NOT NULL DEFAULT 10, "userId" bigint, CONSTRAINT "REL_c47ec76d2c5097d80eaae03853" UNIQUE ("userId"), CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))')
    	await queryRunner.query('CREATE TABLE "location" ("id" BIGSERIAL NOT NULL, "geography" point, "country" character varying(255), "region" character varying(255), "street" character varying(255), "city" character varying(255), "house" character varying(4), "corps" character varying(4), "entrance" character varying(4), "floor" character varying(4), "flat" character varying(4), "userId" bigint, CONSTRAINT "REL_bdef5f9d46ef330ddca009a859" UNIQUE ("userId"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))')
    	await queryRunner.query('ALTER TABLE "alert" ADD CONSTRAINT "FK_c47ec76d2c5097d80eaae03853d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    	await queryRunner.query('ALTER TABLE "location" ADD CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query('ALTER TABLE "location" DROP CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596"')
    	await queryRunner.query('ALTER TABLE "alert" DROP CONSTRAINT "FK_c47ec76d2c5097d80eaae03853d"')
    	await queryRunner.query('DROP TABLE "location"')
    	await queryRunner.query('DROP TABLE "alert"')
    	await queryRunner.query('DROP TABLE "user"')
    }
}
