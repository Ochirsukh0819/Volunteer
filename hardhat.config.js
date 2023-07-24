require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
const { API_URL, COREX_TEST_URL } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [
        "0xa4ee6b2e454de900cfbbdb44d3bafe5aec8c07d28cc15e7306623b38518f2a45",
      ],
      chainId: 11155111,
    },
    corexchain_test: {
      url: COREX_TEST_URL,
      accounts: [
        "0xa4ee6b2e454de900cfbbdb44d3bafe5aec8c07d28cc15e7306623b38518f2a45",
      ],
      chainId: 3305,
    },
  },
};
