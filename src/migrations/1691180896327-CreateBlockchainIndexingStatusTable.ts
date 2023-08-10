import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBlockchainIndexingStatusTable1691180896327 implements MigrationInterface {
    name = 'CreateBlockchainIndexingStatusTable1691180896327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blockchain_indexing_status" ("id" text NOT NULL, "blockchain" text NOT NULL, "block_number" bigint NOT NULL, "type" text NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "inserted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cadcd4f2dd400c3688964b05c82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "unique_blockchain_indexing_status" ON "blockchain_indexing_status" ("blockchain", "type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "unique_blockchain_indexing_status"`);
        await queryRunner.query(`DROP TABLE "blockchain_indexing_status"`);
    }

}
