import { MigrationInterface, QueryRunner } from "typeorm";

export class corrigindoUniqueEmail1676536447322 implements MigrationInterface {
    name = 'corrigindoUniqueEmail1676536447322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" DROP CONSTRAINT "UQ_58a04ab74b45da858bb73756b60"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contatos" ADD CONSTRAINT "UQ_58a04ab74b45da858bb73756b60" UNIQUE ("email")`);
    }

}
