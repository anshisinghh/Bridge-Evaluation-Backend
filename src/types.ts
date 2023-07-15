export interface TransferDetails {
    from: string;
    to: string;
    value: number;
    blockNumber: number;
    transactionHash: string;
    gasUsed: bigint;
    gasPrice: bigint;
  }