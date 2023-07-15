import { AppDataSource } from "./data_source";
import { EventListener } from "./integrations/event_listener";
import { getChain } from "./utils";

(async () => {
    console.log("Starting server");

    await AppDataSource.initialize().then(() => {
        console.log("[Success] DB is connected");
        const { PROVIDER_URL, BLOCKCHAIN_NAME } = process.env;

        // TODO(felix): maybe change this to a env variable
        const USDC_CONTRACT_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
        const STARGATE_CONTRACT_ADDRESS = '0xdf0770df86a8034b3efef0a1bb3c889b8332ff56';
        
        const blockchain = getChain(BLOCKCHAIN_NAME!);
        const listener = new EventListener(blockchain, PROVIDER_URL!, USDC_CONTRACT_ADDRESS, STARGATE_CONTRACT_ADDRESS);
        listener.listenToEvents();
    }).catch((error: any) => {
        console.log("[Error] Error connecting DB", error);
    })
})();