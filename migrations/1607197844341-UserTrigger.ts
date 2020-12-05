import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserTrigger1607197844341 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TRIGGER  IF EXISTS create_alert_location_trigger ON public."user";
            DROP FUNCTION IF EXISTS public.create_alert_location_function();
            CREATE FUNCTION public.create_alert_location_function()
                RETURNS trigger
                LANGUAGE 'plpgsql'
                COST 100
                VOLATILE NOT LEAKPROOF
            AS $BODY$
            BEGIN
                INSERT INTO "public".alert("userId") VALUES(NEW.id);
                INSERT INTO "public".location("userId") VALUES(NEW.id);
                RETURN NEW;
            END;
            $BODY$;
            
            ALTER FUNCTION public.create_alert_location_function() OWNER TO postgres;
            CREATE TRIGGER create_alert_location_trigger
            AFTER INSERT
            ON public."user"
            FOR EACH ROW
            EXECUTE PROCEDURE public.create_alert_location_function();
            `)
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`
            DROP TRIGGER  IF EXISTS create_alert_location_trigger ON public."user";
            DROP FUNCTION IF EXISTS public.create_alert_location_function()
        `)
	}
}
