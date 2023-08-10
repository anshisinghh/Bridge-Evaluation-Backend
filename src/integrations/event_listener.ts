import { Blockchain, BlockchainIndexType } from "../enums";
import { TransferEventsProcessor } from "./transfer_events_processor";
import { BlockchainReader } from "../blockchain_reader";
import { BLOCK_CONFIRMATIONS } from "../constants";
import { TransactionService } from "../services/message_service";
import { BlockchainIndexingStatus } from "../data/blockchain_indexing_status";

export class EventListener {
  private blockchainReader: BlockchainReader;
  private blockchain: Blockchain;
  private transferEventsProcessor: TransferEventsProcessor;

  constructor(blockchain: Blockchain, providerUrl: string, contractAddress: string, destinationAddress: string) {
    this.blockchainReader = new BlockchainReader(providerUrl);
    this.blockchain = blockchain;
    this.transferEventsProcessor = new TransferEventsProcessor(
      blockchain,
      this.blockchainReader,
      contractAddress,
      destinationAddress
    );
  }

  /**
   * @description Starts listening to finalized blocks over a websocket connection and kicks off
   * event indexing process per block
   */
  async listenToEvents(): Promise<void> {
    console.log(`Starting to listen for blocks for ${this.blockchain} chain`);
    this.ensureLastIndexedBlocks();
    const blockConfirmations = BLOCK_CONFIRMATIONS[this.blockchain];
   console.log(blockConfirmations);
   console.log(this.blockchain);

    this.blockchainReader.listenToBlockHeaders(async (blockNumber: number) => {
      await this.fetchAndProcessEvents(blockNumber);
      if (blockNumber % blockConfirmations === 0) {
        await this.fetchAndProcessEvents(blockNumber);
      } else if (blockConfirmations === undefined) {
        throw Error(`BLOCK_CONFIRMATIONS not set for chain ${this.blockchain}`);
      }
    });
  }

  async ensureLastIndexedBlocks() {
    const hiddenTransactionLastIndexedBlock = await BlockchainIndexingStatus.findOne(
      this.blockchain,
      BlockchainIndexType.TRANSFERS
    );
    this.transferEventsProcessor.setLastIndexedBlock(
      hiddenTransactionLastIndexedBlock ? hiddenTransactionLastIndexedBlock.blockNumber : undefined
    );
  }

  async fetchAndProcessEvents(latestBlock: number): Promise<void> {
    try {
      const events = await this.transferEventsProcessor.processEvents(latestBlock);
      if (events === undefined) return;
      await TransactionService.saveTransactions(events, this.blockchainReader);
      await BlockchainIndexingStatus.upsert(this.blockchain,BlockchainIndexType.TRANSFERS,latestBlock);
      this.transferEventsProcessor.synchronizeBlockIndexingStatus(latestBlock);
    } catch (err) {
      console.error("[EventListener][fetchAndProcessEvents]", err);
    }
  }
}