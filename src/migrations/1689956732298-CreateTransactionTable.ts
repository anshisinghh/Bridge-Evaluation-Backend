import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransactionTable1689956732298 implements MigrationInterface {
    name = 'CreateTransactionTable1689956732298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" text NOT NULL, "from" text NOT NULL, "amount" bigint NOT NULL, "source_transaction_hash" text NOT NULL, "source_blockchain" text NOT NULL, "source_blockchain_gas" bigint NOT NULL, "source_blockchain_gas_price" bigint NOT NULL, "source_blockchain_native_token_price" bigint, "initiated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "inserted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "unique_transaction" ON "transaction" ("source_blockchain", "source_transaction_hash") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."unique_transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
