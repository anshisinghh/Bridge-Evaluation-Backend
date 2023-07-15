import { Blockchain } from "./enums";

export const BLOCK_CONFIRMATIONS: { [s: string]: number } = {
  [Blockchain.ETHEREUM]: 12,
  [Blockchain.POLYGON]: 60,
  [Blockchain.BINANCE]: 12,
  [Blockchain.ARBITRUM_ONE]: 60,
  [Blockchain.ARBITRUM_NOVA]: 60,
  [Blockchain.OPTIMISM]: 60,
  [Blockchain.EVMOS]: 12,
  [Blockchain.MOONBEAM]: 12,

  // testnets
  [Blockchain.ETHEREUM_GOERLI]: 12,
  [Blockchain.ARBITRUM_NITRO_GOERLI]: 60,
  [Blockchain.OPTIMISM_GOERLI]: 60,
  [Blockchain.POLYGON_MUMBAI]: 60,
  [Blockchain.BINANCE_TESTNET]: 25,

  // local testing
  [Blockchain.HARDHAT]: 6,
  [Blockchain.LOCAL_TESTNET_ETHEREUM]: 6,
  [Blockchain.LOCAL_TESTNET_POLYGON]: 6,
};

// keeps track of the number of blocks that have to pass between successive messages
export const BLOCKCHAIN_MESSAGING_CADENCE: { [s: string]: number } = {
  [Blockchain.ETHEREUM]: 12,
  [Blockchain.POLYGON]: 60,
  [Blockchain.BINANCE]: 12,
  [Blockchain.ARBITRUM_ONE]: 60,
  [Blockchain.ARBITRUM_NOVA]: 60,
  [Blockchain.OPTIMISM]: 60,
  [Blockchain.EVMOS]: 12,
  [Blockchain.MOONBEAM]: 12,

  // testnets
  [Blockchain.ETHEREUM_GOERLI]: 12,
  [Blockchain.ARBITRUM_NITRO_GOERLI]: 60,
  [Blockchain.OPTIMISM_GOERLI]: 60,
  [Blockchain.POLYGON_MUMBAI]: 60,
  [Blockchain.BINANCE_TESTNET]: 60,

  // local testing
  [Blockchain.HARDHAT]: 6,
  [Blockchain.LOCAL_TESTNET_ETHEREUM]: 6,
  [Blockchain.LOCAL_TESTNET_POLYGON]: 6,
};

// gas limits
export const GAS_LIMIT: { [s: string]: number } = {
  [Blockchain.ETHEREUM]: 30_000_000,
  [Blockchain.POLYGON]: 30_000_000,
  [Blockchain.BINANCE]: 139_000_000,
  [Blockchain.ARBITRUM_ONE]: 1_125_899_906_842_624,
  [Blockchain.ARBITRUM_NOVA]: 1_125_899_906_842_624,
  [Blockchain.OPTIMISM]: 30_000_000,
  [Blockchain.EVMOS]: 25_000_000,
  [Blockchain.MOONBEAM]: 15_000_000,

  // testnets
  [Blockchain.ETHEREUM_GOERLI]: 30_000_000,
  [Blockchain.ARBITRUM_NITRO_GOERLI]: 1_125_899_906_842_624,
  [Blockchain.OPTIMISM_GOERLI]: 30_000_000,
  [Blockchain.POLYGON_MUMBAI]: 30_000_000,
  [Blockchain.BINANCE_TESTNET]: 30_000_000,

  // local testing
  [Blockchain.HARDHAT]: 30_000_000,
  [Blockchain.LOCAL_TESTNET_ETHEREUM]: 30_000_000,
  [Blockchain.LOCAL_TESTNET_POLYGON]: 30_000_000,
};

export const BLOCKCHAIN_ID: { [s: string]: number } = {
  [Blockchain.ETHEREUM]: 1,
  [Blockchain.POLYGON]: 2,
  [Blockchain.BINANCE]: 3,
  [Blockchain.ARBITRUM_ONE]: 4,
  [Blockchain.ARBITRUM_NOVA]: 5,
  [Blockchain.OPTIMISM]: 6,
  [Blockchain.EVMOS]: 7,
  [Blockchain.MOONBEAM]: 8,

  // testnets
  [Blockchain.ETHEREUM_GOERLI]: 1_000_000_000,
  [Blockchain.ARBITRUM_NITRO_GOERLI]: 1_000_000_001,
  [Blockchain.OPTIMISM_GOERLI]: 1_000_000_002,
  [Blockchain.POLYGON_MUMBAI]: 1_000_000_003,
  [Blockchain.BINANCE_TESTNET]: 1_000_000_004,

  // local testing
  [Blockchain.HARDHAT]: 1_000_000_000_000,
  [Blockchain.LOCAL_TESTNET_ETHEREUM]: 1_000_000_000_001,
  [Blockchain.LOCAL_TESTNET_POLYGON]: 1_000_000_000_002,
};

export const BLOCKCHAIN_ID_TO_ENUM: { [s: number]: Blockchain } = {
  [1]: Blockchain.ETHEREUM,
  [2]: Blockchain.POLYGON,
  [3]: Blockchain.BINANCE,
  [4]: Blockchain.ARBITRUM_ONE,
  [5]: Blockchain.ARBITRUM_NOVA,
  [6]: Blockchain.OPTIMISM,
  [7]: Blockchain.EVMOS,
  [8]: Blockchain.MOONBEAM,

  // testnets
  [1_000_000_000]: Blockchain.ETHEREUM_GOERLI,
  [1_000_000_001]: Blockchain.ARBITRUM_NITRO_GOERLI,
  [1_000_000_002]: Blockchain.OPTIMISM_GOERLI,
  [1_000_000_003]: Blockchain.POLYGON_MUMBAI,
  [1_000_000_004]: Blockchain.BINANCE_TESTNET,

  // local testing
  [1_000_000_000_000]: Blockchain.HARDHAT,
  [1_000_000_000_001]: Blockchain.LOCAL_TESTNET_ETHEREUM,
  [1_000_000_000_002]: Blockchain.LOCAL_TESTNET_POLYGON,
};

export const BLOCKCHAIN_NAME_TO_ENUM: { [s: string]: Blockchain } = {
  ["ETHEREUM"]: Blockchain.ETHEREUM,
  ["POLYGON"]: Blockchain.POLYGON,
  ["BINANCE"]: Blockchain.BINANCE,
  ["ARBITRUM_ONE"]: Blockchain.ARBITRUM_ONE,
  ["ARBITRUM_NOVA"]: Blockchain.ARBITRUM_NOVA,
  ["OPTIMISM"]: Blockchain.OPTIMISM,
  ["EVMOS"]: Blockchain.EVMOS,
  ["MOONBEAM"]: Blockchain.MOONBEAM,

  // testnets
  ["ETHEREUM_GOERLI"]: Blockchain.ETHEREUM_GOERLI,
  ["ARBITRUM_NITRO_GOERLI"]: Blockchain.ARBITRUM_NITRO_GOERLI,
  ["OPTIMISM_GOERLI"]: Blockchain.OPTIMISM_GOERLI,
  ["POLYGON_MUMBAI"]: Blockchain.POLYGON_MUMBAI,
  ["BINANCE_TESTNET"]: Blockchain.BINANCE_TESTNET,

  // local testing
  ["HARDHAT"]: Blockchain.HARDHAT,
  ["LOCAL_TESTNET_ETHEREUM"]: Blockchain.LOCAL_TESTNET_ETHEREUM,
  ["LOCAL_TESTNET_POLYGON"]: Blockchain.LOCAL_TESTNET_POLYGON,
};
