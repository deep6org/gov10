require('dotenv').config()

const { expect } = require("chai");
const { parseUnits, formatUnits } = require("@ethersproject/units");

const { ethers } = require("hardhat");
const abi = require('ethereumjs-abi');

// change on deployment
const nftFactoryAddress = '0x27F54ba285Bc72ea5851C11c25132Ba306c79FFc'

const daiContractAddress = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD'

let nftFactory;
let signature;

let tokenURI = 'beef'
let dataKey = 'b6a385ba8f14ac4403721c27c6960432791e347b8676641fa381bd95a9e85812'

require("@nomiclabs/hardhat-web3");

describe("NFTFactory", function() {


	before(async () => {
		const [owner, borrower] = await ethers.getSigners();
		nftFactory = await ethers.getContractAt("NFTFactory", nftFactoryAddress);

 	 	const [signer] = await web3.eth.getAccounts();


		console.log('await web3.eth.getAccounts()');
		console.log(await web3.eth.getAccounts());

		// Create Hashed Message
		const hash = "0x" + abi.soliditySHA3([
				'address', 'string', 'address'
			], [
				owner.address, dataKey, borrower.address
			]).toString('Hex');
		
		console.log("HASH")
		console.log(hash)

		let signatureWeb3 = web3.eth.accounts.sign(hash, process.env.KOVAN_PRIVATE_KEY)
		console.log("signatureWeb3")
		console.log(signatureWeb3.signature)
		// Sign Transaction
		signature = await owner.signMessage(hash);
		signature = signatureWeb3.signature;

		console.log("SIGNATURE")
		console.log(signature)
		console.log('---accounts---')
		console.log(owner.address)
		console.log('--------------')
	})

	// it('mints an NFT', async() => {
	// // it.only('mints an NFT', async() => {
	// 	const [owner] = await ethers.getSigners();

	// 	const balance = await nftFactory.balanceOf(owner.address)
	// 	console.log(balance.toString())

	// 	// let contract = new ethers.Contract(contractAddress, abi, ethers.provider);
	// 	const tokenMetadata = ethers.utils.formatBytes32String("howdie:" + balance.toString())

 //    // function issueNFTCommitment(address owner, uint depositAmount, uint daysAfter, bytes memory dataHash, string memory tokenUri) public {

	// 	const res = await nftFactory.issueNFTCommitment(owner.address, 30, "b6a385ba8f14ac4403721c27c6960432791e347b8676641fa381bd95a9e85812", "http://")
	// 	console.log(res)
	// })
	
	// it('get the balance of the NFT', async() => {
	it.only('get the balance of the NFT for the nftFactoryAddress', async() => {
		const [owner] = await ethers.getSigners();

		// get balanceOf
		const balance = await nftFactory.balanceOf(nftFactoryAddress)
		console.log(balance.toString())
	})

	it('issues an nft and commitment', async () => {
	// it.only('issues an nft and commitment', async () => {
		// sign media string
		// deposit collateral with media string

		const [owner, borrower] = await ethers.getSigners();

		// get balanceOf
		// address owner, uint price, uint weeksAfter, bytes memory dataHash
		const res = await nftFactory.issueNFTCommitment(owner.address, borrower.address, 10, 52, signature, tokenURI)
		console.log(res)

		// get balanceOf
		const balance = await nftFactory.balanceOf(owner.address)
		console.log(balance.toString())

		// send raw data key
	})

	// it('reveals an nft', async () => {
	it.only('reveals an nft', async () => {
		// sign media string
		// deposit collateral with media string

		const [owner, borrower] = await ethers.getSigners();
		const bioTokenId = 0;

		// get balanceOf
		// address owner, uint price, uint weeksAfter, bytes memory dataHash
    	// address owner, uint tokenId, string memory _dataKey, bytes memory _dataHash, address buyer) public {
    	// function reveal(address owner, uint tokenId, string memory tokenKey, bytes memory _signature, address buyer) public view returns (address) {
    	console.log("signature")
    	console.log(signature)
		const res = await nftFactory.reveal(owner.address, bioTokenId, dataKey, signature, borrower.address)
		console.log("ADDreSS_REVEAL")
		console.log(res)

		// get balanceOf
		const balance = await nftFactory.balanceOf(owner.address)
		console.log(balance.toString())

		// send raw data key
	})

	// it('redeems an nft', async () => {
	it.only('redeems an nft', async () => {
		const [owner, borrower] = await ethers.getSigners();
		
		nftFactory = await ethers.getContractAt("NFTFactory", nftFactoryAddress, borrower);


		console.log("signature")
    	console.log(signature)
		const bioTokenId = 0;

		const res = await nftFactory.redeem(bioTokenId, daiContractAddress, dataKey)
		console.log("TRANSFER")
		console.log(res)

		// get balanceOf
		const balance = await nftFactory.balanceOf(owner.address)
		console.log(balance.toString())
	})


	// it('gets an nft', async () => {
	it.only('gets an nft', async () => {
		// sign media string
		// deposit collateral with media string

		const [owner, borrower] = await ethers.getSigners();

		const bioTokenId = 0;
		// get balanceOf
		const bio = await nftFactory.bioIndexes(bioTokenId);
		const uri = await nftFactory.tokenURI(bioTokenId);
		console.log('bio.redeemablePrice.toString()')
		console.log(bio)
		console.log(bio.redeemablePrice.toString())
		console.log(uri)

		// send raw data key
	})
	
})