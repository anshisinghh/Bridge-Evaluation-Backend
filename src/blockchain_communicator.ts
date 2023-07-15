import { ethers, TransactionReceipt } from "ethers";
import { BlockchainReader } from "./blockchain_reader";
import { BlockchainWriter } from "./blockchain_writer";

export class BlockchainCommunicator {
  private reader: BlockchainReader;
  private writer: BlockchainWriter;

  constructor(walletPrivateKeyEnvKey: string, providerUrl: string) {
    this.reader = new BlockchainReader(providerUrl);
    this.writer = new BlockchainWriter(walletPrivateKeyEnvKey, providerUrl);
  }

  public getReader(): BlockchainReader {
    return this.reader;
  }

  public getWriter(): BlockchainWriter {
    return this.writer;
  }


  public getLatestBlockNumber(): Promise<number> {
    return this.reader.getLatestBlockNumber();
  }

  public getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt | null> {
    return this.reader.getTransactionReceipt(transactionHash);
  }

  public listenToBlockHeaders(eventHandler: (blockNumber: number) => void): void {
    this.reader.listenToBlockHeaders(eventHandler);
  }

  public async getEvents(
    fromBlock: number,
    toBlock: number,
    eventTopics?: string[],
    addresses?: Array<string>
  ): Promise<ethers.Log[]> {
    return await this.reader.getEvents(fromBlock, toBlock, eventTopics, addresses);
  }

  public getContract(address: string, abi: ethers.InterfaceAbi): ethers.Contract {
    return this.reader.getContract(address, abi);
  }

  public async submitTransaction(transaction: ethers.ContractTransaction): Promise<ethers.TransactionReceipt | null> {
    return this.writer.submitTransaction(transaction);
  }
}