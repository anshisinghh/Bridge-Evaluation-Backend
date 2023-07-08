import { AppDataSource } from "./data_source";
import { EventListener } from "./integrations/blockchain_listener";

(async () => {
    console.log("Starting server");

    await AppDataSource.initialize().then(async () => {
        console.log("[Success] DB is connected");
        const listener = new EventListener("https://eth-mainnet.g.alchemy.com/v2/MEAp8NBjTOX5u72tvYIykWdPKfJFylMw");
        await listener.getEvents()
    }).catch((error: any) => {
        console.log("[Error] Error connecting DB", error);
    })
})();