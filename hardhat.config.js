require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const INFURA_KEY = process.env.INFURA_KEY;
const PK = process.env.PK;
const ETHERSCAN_APIKEY = process.env.ETHERSCAN_APIKEY;

module.exports = {
  defaultNetwork: "bsctestnet",
  networks: {
    hardhat: {},
    bsc: {
      accounts: [PK],
      url: `https://bsc-dataseed.binance.org/`,
      chainId: 56,
    },
    bsctestnet: {
      accounts: [PK],
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    apiKey: ETHERSCAN_APIKEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 200,
  },
};
