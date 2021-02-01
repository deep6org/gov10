
const { expect } = require("chai");
const { parseUnits, formatUnits } = require("@ethersproject/units");

const { ethers } = require("hardhat");

const nftFactoryAddress = '0x5a249591A78a01480F4088321156B4a5450D0985'
let nftFactory;
let sig;

describe("NFTFactory", function() {

	before(async () => {
		const [owner, borrower] = await ethers.getSigners();
		nftFactory = await ethers.getContractAt("NFTFactory", nftFactoryAddress);

		// Create Hashed Message
		const hash = "0x" + abi.soliditySHA3([
				'address', 'string', 'uint256', 'address'
			], [recipient, tokenURI, nonce, contractAddress]).toString('Hex');

		// Sign Transaction
		signature = web3.eth.sign(owner, hash);
	})

	it('mints an NFT', async() => {
	// it.only('mints an NFT', async() => {
		const [owner] = await ethers.getSigners();

		const balance = await nftFactory.balanceOf(owner.address)
		console.log(balance.toString())

		// let contract = new ethers.Contract(contractAddress, abi, ethers.provider);
		const tokenMetadata = ethers.utils.formatBytes32String("howdie:" + balance.toString())

		const res = await nftFactory.issue(owner.address, tokenMetadata)
		console.log(res)
	})
	
	it('get the balance of the NFT', async() => {
	// it.only('get the balance of the NFT', async() => {
		const [owner] = await ethers.getSigners();

		// get balanceOf
		const balance = await nftFactory.balanceOf(owner.address)
		console.log(balance.toString())
	})

	it('reveals nft', async () => {
		// sign media string
		// deposit collateral with media string


		// send raw data key
	})
	
})