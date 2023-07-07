import { BlockchainReader } from "./blockchain_reader";
const ethers = require('ethers');
const ERC20ABI = require('erc20.json');

export class EventListener{
    private blockReader: BlockchainReader;

    constructor(providerUrl: string){
        this.blockReader = new BlockchainReader(providerUrl); 
    }

    async getEvents(fromBlock: 17614927, toBlock: number, eventTopics?: string[], addresses?: Array<string>){
        const starGateAddress = "0xdf0770df86a8034b3efef0a1bb3c889b8332ff56"
        const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

        const signature = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Transfer(address,address,uint256)'));

        const encodedAddress = ethers.AbiCoder.defaultAbiCoder().encode(["address"], [starGateAddress]);
        const topics = [signature, encodedAddress];

        const events = await this.blockReader.getEvents(fromBlock, toBlock, topics, encodedAddress);
        const abi = new ethers.utils.Interface(ERC20ABI.abi);

        for (let i = 0; i < events.length; i++) {
            const log = events[i];
            const parsedLog = abi.parseLog({ topics: log.topics, data: log.data });
            console.log(parsedLog);
        }
    }
    
    async listenToEvents(){

    }

    async getTransactionReceipt(transactionHash: string){
        const receipt = await this.blockReader.getTransactionReceipt(transactionHash);

        if(receipt){
            console.log('Gas Price:', receipt.gasPrice.toString());
            console.log('Gas Used:', receipt.gasUsed.toString());
        } 
        else{
            console.log('Transaction receipt not found.');
        }
    }
}