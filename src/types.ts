export interface TransactionMetaData {
    initiatedByAddress: string;
    initiatedAt: Date;
  }
  
  export interface TransferDetails {
    from: string;
    to: string;
    value: number;
    blockNumber: number;
    transactionHash: string;
    gasUsed: bigint;
    gasPrice: bigint;
    transactionMetaData?: TransactionMetaData
  }