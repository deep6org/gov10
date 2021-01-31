
const { expect } = require("chai");
const { parseUnits, formatUnits } = require("@ethersproject/units");

const { ethers } = require("hardhat");

const nftFactoryAddress = '0x5a249591A78a01480F4088321156B4a5450D0985'
let nftFactory;
describe("NFTFactory", function() {

	before(async () => {
		nftFactory = await ethers.getContractAt("NFTFactory", nftFactoryAddress);
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
		
	})
	
})