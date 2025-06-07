import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableBook1749049750523 implements MigrationInterface {
    name = 'CreateTableBook1749049750523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "summary" character varying NOT NULL, "author" character varying NOT NULL, "total_pages" integer NOT NULL, "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
