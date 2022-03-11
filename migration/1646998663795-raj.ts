import {MigrationInterface, QueryRunner} from "typeorm";

export class raj1646998663795 implements MigrationInterface {
    name = 'raj1646998663795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "desc" character varying NOT NULL, "status" character varying NOT NULL, "usersId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "color" character varying NOT NULL, "taskId" uuid, CONSTRAINT "REL_7a858e482a8e8607643fcbf033" UNIQUE ("taskId"), CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pets_users_mapping" ("pets_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_94f7a4903471e8fe8fb2fc695d8" PRIMARY KEY ("pets_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_62abbbb3b6febd5308a3dd52e6" ON "pets_users_mapping" ("pets_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6bb5efc9dbf095739353e0975e" ON "pets_users_mapping" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_6a5dd6e64fd0c54ef34a4fe9a69" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_7a858e482a8e8607643fcbf033f" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets_users_mapping" ADD CONSTRAINT "FK_62abbbb3b6febd5308a3dd52e60" FOREIGN KEY ("pets_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pets_users_mapping" ADD CONSTRAINT "FK_6bb5efc9dbf095739353e0975eb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets_users_mapping" DROP CONSTRAINT "FK_6bb5efc9dbf095739353e0975eb"`);
        await queryRunner.query(`ALTER TABLE "pets_users_mapping" DROP CONSTRAINT "FK_62abbbb3b6febd5308a3dd52e60"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_7a858e482a8e8607643fcbf033f"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_6a5dd6e64fd0c54ef34a4fe9a69"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6bb5efc9dbf095739353e0975e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62abbbb3b6febd5308a3dd52e6"`);
        await queryRunner.query(`DROP TABLE "pets_users_mapping"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
