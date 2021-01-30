require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// Go to https://infura.io/ and create a new project
// Replace this with your Infura project ID
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
const ALCHEMY_URL = `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_API_KEY}`;

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const KOVAN_PRIVATE_KEY = process.env.KOVAN_PRIVATE_KEY || '';
const KOVAN_PRIVATE_KEY_B = process.env.KOVAN_PRIVATE_KEY_B || '';

module.exports = {
  solidity: "0.7.3",
  networks: {
    kovan: {
      url: `${ALCHEMY_URL}`,
      saveDeployments: true,
      accounts: [`0x${KOVAN_PRIVATE_KEY}`, `0x${KOVAN_PRIVATE_KEY_B}`],
      gas: 12487794,
      gasPrice: 1e10,
      networkCheckTimeout: 500000000,
      timeoutBlocks: 200
    },
    local: {
      url: `http://localhost:8545`
    }
  }
};
