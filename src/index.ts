import { AppDataSource } from "./data_source";

(async () => {
    console.log("Starting server");

    await AppDataSource.initialize().then(() => {
        console.log("[Success] DB is connected");
        
    }).catch((error: any) => {
        console.log("[Error] Error connecting DB", error);
    })
})();