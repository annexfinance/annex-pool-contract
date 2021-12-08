require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

var INFURA_KEY = "4913daa7178a4c77823ddea002c39d00";
const mnemonic = "";

module.exports = {
  defaultNetwork: "bsctestnet",
  networks: {
    hardhat: {
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: ["a4f96c04ed56df73a0f1b36bcdac8b479f75d08459817435e3b2b95c8d49724c"]
    },
    bscmainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      // accounts: { mnemonic: mnemonic }
      // accounts: [""]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "UN1PB9XKIN1QGIGI9XH1G1KRB4GSSBM5V3"
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
}