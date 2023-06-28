import { AppDataSource } from "./data_source";
import { EventListener } from "./integrations/event_listener";

(async () => {
    console.log("Starting server");

    const { START_BLOCK, PROVIDER_URL } = process.env;

    await AppDataSource.initialize().then(() => {
        console.log("[Success] DB is connected");
        const eventListener = new EventListener(START_BLOCK as unknown as number, PROVIDER_URL as string);
        eventListener.listenToEvents().then(() => {
            console.log("Started listening to events");
        });
    }).catch((error: any) => {
        console.log("[Error] Error connecting DB", error);
    })
})();