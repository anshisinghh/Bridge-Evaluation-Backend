import { ethers } from "ethers";
import { BlockchainReader } from "../blockchain_reader";
import { TransactionMetaData, TransferDetails } from "../types";
import { Transaction } from "../data/transaction";

export class TransactionService {
  static async saveTransactions(transferDetails: TransferDetails[], blockchainReader: BlockchainReader): Promise<number> {
    const promises = transferDetails.map(async (details) => {
      const transactionData = await this.getTransactionTimestampAndInitiator(
        details.transactionHash,
        details.blockNumber,
        blockchainReader
      );

      details.transactionMetaData = transactionData;

      return await Transaction.create(details);
    });

    const updatedTransferDetails = await Promise.all(promises);
    return updatedTransferDetails.length
  }


  private static async getTransactionTimestampAndInitiator (
    transactionHash: string,
    blockNumber: number,
    blockchainReader: BlockchainReader
  ): Promise<TransactionMetaData | undefined> {
    try {
      const promises = [0, 1].map(async (index) => {
        if (index == 0) {
          return await blockchainReader?.getTransactionReceipt(transactionHash);
        } else {
          return await blockchainReader?.getBlock(blockNumber as unknown as string);
        }
      });
  
      const [receipt, block] = await Promise.all(promises);
  
      return {
        initiatedByAddress: (receipt as ethers.TransactionReceipt).from,
        initiatedAt: new Date((block as ethers.Block).timestamp),
      };
    } catch (err: any) {
      return undefined;
    }
  };
}