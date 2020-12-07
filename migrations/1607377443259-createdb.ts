import {MigrationInterface, QueryRunner} from "typeorm";

export class createdb1607377443259 implements MigrationInterface {
    name = 'createdb1607377443259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "email" character varying(255) NOT NULL, "current_sign_in_at" TIMESTAMP NOT NULL DEFAULT now(), "last_sign_in_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alert" ("alert_token" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" BIGSERIAL NOT NULL, "color" character varying(7) NOT NULL DEFAULT '#000000', "font_size" smallint NOT NULL DEFAULT '14', "message" character varying(50) NOT NULL DEFAULT 'Hello there', "duration" smallint NOT NULL DEFAULT '5', "interval" smallint NOT NULL DEFAULT '10', "userId" bigint, CONSTRAINT "REL_c47ec76d2c5097d80eaae03853" UNIQUE ("userId"), CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" BIGSERIAL NOT NULL, "filename" character varying(50) NOT NULL DEFAULT '', "imageableId" integer NOT NULL, "imageableType" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "provider_provider_enum" AS ENUM('twitch', 'google')`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" BIGSERIAL NOT NULL, "provider" "provider_provider_enum" NOT NULL, "provider_id" character varying(255) NOT NULL, "display_name" character varying(255) NOT NULL, "userId" bigint, CONSTRAINT "UQ_092b053f2a3e5220a01f6323638" UNIQUE ("provider_id"), CONSTRAINT "REL_da1c78142007c621b5498c818c" UNIQUE ("userId"), CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partner" ("id" BIGSERIAL NOT NULL, "name" character varying(20) NOT NULL, "min_limit" smallint NOT NULL DEFAULT '400', CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" BIGSERIAL NOT NULL, "geography" point, "country" character varying(255), "region" character varying(255), "street" character varying(255), "city" character varying(255), "house" character varying(4), "corps" character varying(4), "entrance" character varying(4), "floor" character varying(4), "flat" character varying(4), "userId" bigint, CONSTRAINT "REL_bdef5f9d46ef330ddca009a859" UNIQUE ("userId"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "alert" ADD CONSTRAINT "FK_c47ec76d2c5097d80eaae03853d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_da1c78142007c621b5498c818c1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_da1c78142007c621b5498c818c1"`);
        await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "FK_c47ec76d2c5097d80eaae03853d"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "partner"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TYPE "provider_provider_enum"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "alert"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
