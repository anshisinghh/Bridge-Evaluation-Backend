// import { BlockchainReader } from "./blockchain_reader";
// import { ethers } from "ethers";
// import ERC20ABI from '../abi/erc20.json';

// export class EventListener{
//     private blockReader: BlockchainReader;

//     constructor(providerUrl: string){
//         this.blockReader = new BlockchainReader(providerUrl); 
//     }

//     async getEvents(){
//         const starGateAddress = "0xdf0770df86a8034b3efef0a1bb3c889b8332ff56"
//         const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

//         const signature = ethers.keccak256(ethers.toUtf8Bytes('Transfer(address,address,uint256)'));

//         const encodedAddress = ethers.AbiCoder.defaultAbiCoder().encode(["address"], [starGateAddress]);
//         const topics = [signature, encodedAddress];

//         const events = await this.blockReader.getEvents(17614927, undefined, topics, [USDCAddress]);
//         const abi = new ethers.Interface(ERC20ABI);

//         for(let i = 0; i < events.length; i++) {
//             const log = events[i];
//             const parsedLog = abi.parseLog({ topics: log.topics as string[], data: log.data });
//             // console.log(parsedLog);
//             console.log(parsedLog?.args);

//             // if(parsedLog?.args[0] === starGateAddress){
//             //     console.log(parsedLog?.args);
//             // }

//             await this.getTransactionReceipt(log.transactionHash);
//         }
//     }

//     async getTransactionReceipt(transactionHash: string){
//         const receipt = await this.blockReader.getTransactionReceipt(transactionHash);

//         if(receipt){
//             console.log('Gas Price:', receipt.gasPrice.toString());
//             console.log('Gas Used:', receipt.gasUsed.toString());
//         } 
//         else{
//             console.log('Transaction receipt not found.');
//         }
//     }
// }