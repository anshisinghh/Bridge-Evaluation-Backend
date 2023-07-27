import { BeforeUpdate, BeforeInsert, Column, Entity, Index, PrimaryColumn } from "typeorm";
import { Blockchain } from "../enums";
import { uuidWithPrefix } from "../utils";

/**
 * Store the information about transactions.
 */
@Entity({ name: "transaction" })
@Index("unique_transaction", ["sourceBlockchain", "sourceTransactionHash"], { unique: true })
export class Transaction {
  @PrimaryColumn({ name: "id", type: "text", update: false })
  id: string;

  // address of source account
  @Column({ name: "from", type: "text", update: false })
  from: string;

  // the amount that was sent
  @Column({ name: "amount", type: "bigint", update: false })
  amount: number;

  // hash of the transaction on the source blockchain
  @Column({ name: "source_transaction_hash", type: "text", update: false })
  sourceTransactionHash: string;

  // the chain where the transaction originated
  @Column({ name: "source_blockchain", type: "text", update: false })
  sourceBlockchain: Blockchain;

  // the gas used in the source blockchain
  @Column({ name: "source_blockchain_gas", type: "bigint", update: false })
  sourceBlockchainGas: number;

  // the price of gas in the source blockchain
  @Column({ name: "source_blockchain_gas_price", type: "bigint", update: false })
  sourceBlockchainGasPrice: number;

  // this is the price of the native token in USD
  @Column({ name: "source_blockchain_native_token_price", type: "bigint", update: false, nullable: true })
  sourceBlockchainNativeTokenPrice?: number;

  // the date that the transaction was initiated from the source chain
  @Column({ type: "timestamptz", name: "initiated_at", update: false })
  initiatedAt: Date;

  // the date that the transaction was saved in this DB
  @Column({type: "timestamptz",name: "inserted_at",default: () => "CURRENT_TIMESTAMP",update: false })
  insertedAt: Date;

  @BeforeInsert()
  // @ts-ignore
  private beforeInsert() {
    this.validate();
    this.generateUuids();
  }

  @BeforeUpdate()
  // @ts-ignore
  private beforeUpdate() {
    this.validate();
  }

  generateUuids(): void {
    this.id = uuidWithPrefix(true, "tra");
  }

  async validate(): Promise<void> {
    // TODO(felix): validate the address and make sure it actually meets the format
    this.sourceTransactionHash = this.sourceTransactionHash.trim().toLowerCase();
    this.from = this.from?.trim();
  }
}