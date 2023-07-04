import { BlockchainReader } from "./blockchain_reader";

export class EventListener{
    const blockReader: BlockchainReader

    constructor(providerUrl: string){
        this.blockReader = new BlockchainReader(providerUrl) 
    }

    async getEvents(){
        const starGateAdress = "0xdf0770df86a8034b3efef0a1bb3c889b8332ff56"
        const USDCAdress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    }
    
    async listenToEvents(){

    }
}