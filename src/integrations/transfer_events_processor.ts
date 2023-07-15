import { ethers, Log } from "ethers";
import ERC20ABI from "../abis/erc20.json";
import { BLOCK_CONFIRMATIONS } from "../constants";
import { TransferDetails } from "../types";
import { BlockchainReader } from "../blockchain_reader";
import { Blockchain, BlockStatus } from "../enums";
import { getBlockStatus, notEmpty } from "../utils";

export class TransferEventsProcessor {
  private latestBlockWithSavedEvents: number;
  private blockchainReader: BlockchainReader;
  private blockchain: Blockchain;
  private contractAddress: string;
  private destinationAddress: string;
  private transferEventSignature: string;

  constructor(
    blockchain: Blockchain, 
    blockchainReader: BlockchainReader, 
    contractAddress: string, 
    destinationAddress: string
  ) {
    this.latestBlockWithSavedEvents = 0;
    this.blockchainReader = blockchainReader;
    this.blockchain = blockchain;
    this.contractAddress = contractAddress;
    this.transferEventSignature = ethers.keccak256(ethers.toUtf8Bytes('Transfer(address,address,uint256)'))
    this.destinationAddress = destinationAddress;
  }

  async setLastIndexedBlock(lastIndexedBlock?: number) {
    const latestBlock = await this.blockchainReader.getLatestBlockNumber();

    if (this.latestBlockWithSavedEvents == 0) {
      if (lastIndexedBlock && lastIndexedBlock < latestBlock) {
        this.latestBlockWithSavedEvents = lastIndexedBlock;
      } else {
        this.latestBlockWithSavedEvents = Math.max(latestBlock - 50, 1);
      }
    } else if (this.latestBlockWithSavedEvents > latestBlock) {
      this.latestBlockWithSavedEvents = Math.max(latestBlock - 50, 1);
    }
  }

  synchronizeBlockIndexingStatus(latestBlock: number): void {
    this.latestBlockWithSavedEvents = Math.max(this.latestBlockWithSavedEvents, latestBlock);
  }

  getBlockIndexingStatus(): number {
    return this.latestBlockWithSavedEvents;
  }

  async processEvents(latestBlock: number): Promise<Array<TransferDetails> | undefined> {
    try {
      const fromBlock =
        this.latestBlockWithSavedEvents == 0
          ? Math.max(latestBlock - 500, 1)
          : Math.max(this.latestBlockWithSavedEvents - BLOCK_CONFIRMATIONS[this.blockchain], 1);

      console.log(
        "[TransferEventsProcessor] starting",
        `fromBlock: ${fromBlock}`,
        `latestBlockWithSavedEvents: ${this.latestBlockWithSavedEvents}`,
        `latestBlock: ${latestBlock} \n`
      );

      const processedEvents = await this.fetchAndProcessTransferEvents(
        fromBlock,
        latestBlock,
      );

      console.log(
        "[TransferEventsProcessor] finished",
        `fromBlock: ${fromBlock}`,
        `latestBlockWithSavedEvents: ${this.latestBlockWithSavedEvents}`,
        `latestBlock: ${latestBlock}`,
        `ProcessedEvents: ${processedEvents?.length} \n`
      );

      return processedEvents;
    } catch (err) {
      console.error("[processEvents] error fetching events", err);
    }
  }

  async fetchAndProcessTransferEvents(
    fromBlock: number,
    latestBlock: number,
  ): Promise<TransferDetails[]> {
    const encodedDestinationAddress = ethers.AbiCoder.defaultAbiCoder().encode(["address"], [this.destinationAddress]);
    const logs: Array<Log> = await this.blockchainReader.getEvents(
      fromBlock,
      latestBlock,
      [this.transferEventSignature, encodedDestinationAddress],
      [this.contractAddress]
    );

    return await this.extractTransferDetailsDetails(logs, latestBlock);
  }

  async extractTransferDetailsDetails(logs: ethers.Log[], latestBlock: number): Promise<TransferDetails[]> {
    const abi = new ethers.Interface(ERC20ABI);
    const promises  = logs
      .map(async (log) => {
        try {
          const event = abi.parseLog({ topics: log.topics as string[], data: log.data });
          if (!event) {
            return null;
          }

          const { from, to , value } = event.args;

          if (to != this.destinationAddress) {
            return null;
          }

          const status = getBlockStatus(log.blockNumber, latestBlock, this.blockchain);
          if (status != BlockStatus.CONFIRMED) {
            return null;
          }

          const receipt = await this.blockchainReader.getTransactionReceipt(log.transactionHash);

          if (!receipt) {
            return null;
          }

          return {
            from,
            to,
            value,
            blockNumber: log.blockNumber,
            transactionHash: log.transactionHash,
            gasUsed: receipt.gasUsed,
            gasPrice: receipt.gasPrice,
          };
        } catch (err) {
          console.error("[extractTransferDetailsDetails] error decoding", err);
          return null;
        }
      })

      const results = await Promise.all(promises);
      return results.filter(notEmpty);
  }
}