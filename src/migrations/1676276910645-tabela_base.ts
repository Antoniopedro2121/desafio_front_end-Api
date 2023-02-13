import { MigrationInterface, QueryRunner } from "typeorm";

export class tabelaBase1676276910645 implements MigrationInterface {
    name = 'tabelaBase1676276910645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contatos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome_completo" character varying(250) NOT NULL, "email" character varying(250) NOT NULL, "apelido" character varying(250), "telefone" integer NOT NULL, "date_creation" TIMESTAMP NOT NULL DEFAULT now(), "date_update" TIMESTAMP NOT NULL DEFAULT now(), "clienteId" uuid, CONSTRAINT "UQ_58a04ab74b45da858bb73756b60" UNIQUE ("email"), CONSTRAINT "PK_994cdcb2c56dfb5b66217c854cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome_completo" character varying(250) NOT NULL, "email" character varying(250) NOT NULL, "telefone" integer NOT NULL, "date_creation" TIMESTAMP NOT NULL DEFAULT now(), "date_update" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_503f81286c5e49acd6a832abf43" UNIQUE ("email"), CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(250) NOT NULL, "name" character varying(100) NOT NULL, "password" character varying(60) NOT NULL, "date_creation" TIMESTAMP NOT NULL DEFAULT now(), "date_update" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contatos" ADD CONSTRAINT "FK_4239f05a745fb2f8ff77569c52f" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" DROP CONSTRAINT "FK_4239f05a745fb2f8ff77569c52f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "contatos"`);
    }

}
