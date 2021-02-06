// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  await hre.run('compile');

  // // We get the contract to deploy
  // const OracleClient = await ethers.getContractFactory("OracleClient");
  // const oracle = await OracleClient.deploy();

  // console.log("OracleClient deployed to:", oracle.address);

  const oracleAddress = "0x5Da2ce650C536b485CFcFbDF21Bd77BDdf4333a7"
  // const NFTFactory = await ethers.getContractFactory("NFTFactory");
  // const factory = await NFTFactory.deploy(oracleAddress);

  // console.log("NFTFactory deployed to:", factory.address);


  const nftFactoryAddress = "0x9728299e76b682F63dD598DaA2B7857EB517C268"

  const CreditExecutor = await ethers.getContractFactory("CreditExecutor");
  const executor = await CreditExecutor.deploy(nftFactoryAddress, oracleAddress);

  await executor.deployed();
  console.log("CreditExecutor deployed to:", executor.address);
  
  
  // Deploying the DAI faucet
  // const DAIFaucet = await ethers.getContractFactory("DAIFaucet");
  
  // const faucet = await DAIFaucet.deploy(
  //   "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
  //   "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa"
  //   );
  
  // await faucet.deployed();

  // console.log("DAIFaucet deployed to:", faucet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
