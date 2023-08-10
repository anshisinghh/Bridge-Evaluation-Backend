import { Column, Entity, Index, BeforeInsert, BeforeUpdate, PrimaryColumn } from "typeorm";
import { Blockchain, BlockchainIndexType } from "../enums";
import { bigIntTransformer, uuidWithPrefix } from "../utils";
import { AppDataSource } from "../data_source";

/**
 * Keep track of what blocks have been indexed on what chains
 **/
@Entity({ name: "blockchain_indexing_status" })
@Index("unique_blockchain_indexing_status", ["blockchain", "type"], { unique: true })
export class BlockchainIndexingStatus {
  @PrimaryColumn({ name: "id", type: "text", update: false })
  id: string;

  // The blockchain that the index refers to
  @Column({ name: "blockchain", type: "text", update: false })
  blockchain: Blockchain;

  // The last block that the blockchain was indexed
  @Column({ name: "block_number", type: "bigint", transformer: bigIntTransformer })
  blockNumber: number;

  // the type of the index of interest
  @Column({ type: "text", name: "type", update: false })
  type: BlockchainIndexType;

  // The last time the blockchain_indexing_status was done update
  @Column({
    type: "timestamptz",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({
    type: "timestamptz",
    name: "inserted_at",
    default: () => "CURRENT_TIMESTAMP",
    update: false,
  })
  insertedAt: Date;

  private validateInitialStatesValue(): void {
    if (BigInt(this.blockNumber) > BigInt(0)) {
      return;
    }

    throw new Error(`Block Number has cannot be <= 0`);
  }

  generateUuid(): void {
    this.id = uuidWithPrefix(true, "bist");
  }

  @BeforeInsert()
  // @ts-ignore
  private beforeInsert() {
    this.validateInitialStatesValue();
    this.generateUuid();
  }

  @BeforeUpdate()
  // @ts-ignore
  private beforeUpdate() {
    this.validateInitialStatesValue();
  }

  /**
   * If an index status exists, lock it and then update. Otherwise create a new status.
   */
  static async upsert(
    blockchain: Blockchain,
    type: BlockchainIndexType,
    blockNumber: number,
    updateBackwards?: boolean
  ): Promise<BlockchainIndexingStatus> {
    return await (await AppDataSource).transaction((transactionalEntityManager) =>
      transactionalEntityManager
        .createQueryBuilder(BlockchainIndexingStatus, "blockchainIndexingStatus")
        .setLock("pessimistic_write")
        .where({ blockchain, type })
        .getOne()
        .then(async (blockchainIndexingStatus) => {
          if (blockchainIndexingStatus) {
            if (blockNumber < BigInt(blockchainIndexingStatus.blockNumber)) {
              if (updateBackwards) {
                blockchainIndexingStatus.blockNumber = blockNumber;
                transactionalEntityManager.save(blockchainIndexingStatus);
              }
            } else {
              blockchainIndexingStatus.blockNumber = blockNumber;
              transactionalEntityManager.save(blockchainIndexingStatus);
            }

            return blockchainIndexingStatus;
          } else {
            const newBlockchainIndexingStatus = new BlockchainIndexingStatus();
            newBlockchainIndexingStatus.blockNumber = blockNumber;
            newBlockchainIndexingStatus.blockchain = blockchain;
            newBlockchainIndexingStatus.type = type;

            return transactionalEntityManager.save(newBlockchainIndexingStatus);
          }
        })
    );
  }

  static async findOne(blockchain: Blockchain, type: BlockchainIndexType): Promise<BlockchainIndexingStatus | null> {
    try {
      return await AppDataSource.getRepository(BlockchainIndexingStatus).findOne({ where: { blockchain, type } });
    } catch (err) {
      return null;
    }
  }
}