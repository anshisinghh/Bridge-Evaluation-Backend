import { Block, ethers, TransactionReceipt } from "ethers";

export class BlockchainReader {
    private provider: ethers.Provider;

    constructor(providerUrl: string) {
        this.provider = ethers.getDefaultProvider(providerUrl);
    }

    public getLatestBlockNumber(): Promise<number> {
        return this.provider.getBlockNumber();
    }

    public getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt | null> {
        return this.provider.getTransactionReceipt(transactionHash);
    }

    public getBlock(transactionHash: string): Promise<Block | null> {
        return this.provider.getBlock(transactionHash);
    }

    public listenToBlockHeaders(eventHandler: (blockNumber: number) => void): void {
        this.provider.on("block", eventHandler);
    }

    public async getEvents(
        fromBlock: number,
        toBlock: number,
        eventTopics?: string[],
        addresses?: Array<string>
    ): Promise<ethers.Log[]> {
        return await this.provider.getLogs({
            topics: eventTopics,
            address: addresses,
            fromBlock: fromBlock,
            toBlock: toBlock,
        });
    }

    public getContract(address: string, abi: ethers.InterfaceAbi): ethers.Contract {
        return new ethers.Contract(address, abi, this.provider);
    }
}