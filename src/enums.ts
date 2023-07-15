export enum Blockchain {
    ETHEREUM = "ethereum",
    POLYGON = "polygon",
    BINANCE = "binance",
    ARBITRUM_ONE = "arbitrum_one",
    ARBITRUM_NOVA = "arbitrum_nova",
    OPTIMISM = "optimism",
    EVMOS = "evmos",
    MOONBEAM = "moonbeam",
  
    // testnets
    ETHEREUM_GOERLI = "ethereum_goerli",
    ARBITRUM_NITRO_GOERLI = "arbitrum_nitro_goerli",
    OPTIMISM_GOERLI = "optimism_goerli",
    POLYGON_MUMBAI = "polygon_mumbai",
    BINANCE_TESTNET = "binance_testnet",
  
    // local testing
    HARDHAT = "hardhat",
    LOCAL_TESTNET_ETHEREUM = "local_testnet_ethereum",
    LOCAL_TESTNET_POLYGON = "local_testnet_polygon",
  }
  
  export enum BlockStatus {
    CONFIRMED = "confirmed",
    UNCONFIRMED = "unconfirmed",
  }