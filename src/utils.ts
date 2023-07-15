import { BLOCKCHAIN_NAME_TO_ENUM, BLOCK_CONFIRMATIONS } from "./constants";
import { BlockStatus, Blockchain } from "./enums";

// used to filter out null and undefined values: https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array
export const notEmpty = <T>(value: T): value is NonNullable<typeof value> => !!value;

export const getBlockStatus = (blockNumber: number, latestBlock: number, blockchain: Blockchain): BlockStatus => {
  return blockNumber <= latestBlock - BLOCK_CONFIRMATIONS[blockchain] ? BlockStatus.CONFIRMED : BlockStatus.UNCONFIRMED;
};

export const getChain = (chainName: string): Blockchain => {
  const blockchain = BLOCKCHAIN_NAME_TO_ENUM[chainName.trim().toUpperCase()];
  if (blockchain) return blockchain;
  throw new Error(`invalid id: ${chainName}`);
};