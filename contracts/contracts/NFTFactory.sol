pragma solidity ^0.6.0;

import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {ECDSA} from '@openzeppelin/contracts/cryptography/ECDSA.sol';
import {SafeMath} from '@openzeppelin/contracts/math/SafeMath.sol';
import { IERC20 } from './Interfaces.sol';

import './OracleClient.sol';

contract NFTFactory is ERC721 {

	using ECDSA for bytes32;
	using SafeMath for uint;

	struct Land {
		uint id;
		uint price;
		bytes agreement;
		uint period;
	}

	struct Bio {
		uint id;
		uint redeemablePrice;
		address toBeOwner;
		bytes hashedLocation;
	}

	event Reveal(address indexed owner, string indexed tokenKey);

	mapping(uint => Land) public landIndexes;
	mapping(uint => Bio) public bioIndexes;
	mapping(uint => address) public tokenHolderByIndex;

    OracleClient public oracleClient;

	constructor(address oracleClientAddress) ERC721("Gov10", "GOV10") public {
		// set rate cap dynamically
        oracleClient = OracleClient(address(oracleClientAddress));
	}

    // function 
    function issueNFTCommitment(address owner, address _buyer, uint depositAmount, uint weeksAfter, bytes memory dataHash, string memory tokenUri) public {
    	// bio NFT to delegator, and land to 
    	uint tokenId = super.totalSupply();
    	uint tokenIdLand = tokenId + 1;

    	// temp
    	uint price = depositAmount;

    	// cap on price ownership
    	// require(cap <= 0.5)

    	// creates the bio nft
    	Bio memory bio = Bio(tokenId, price, _buyer, dataHash);
    	// Bio memory bio = Bio(tokenId, price.mul(2).div(10), owner, dataHash);
    	bioIndexes[tokenId] = bio;

    	Land memory land = Land(tokenId, price, dataHash, weeksAfter);
    	landIndexes[tokenIdLand] = land;

    	tokenHolderByIndex[tokenId] = owner;
    	tokenHolderByIndex[tokenIdLand] = owner;

    	// 
    	// super.approve(address(this), tokenId);

    	// mints the bio
		super._safeMint(owner, tokenId, dataHash);
		// wait to seet tokenuri

		// mints the land
		super._safeMint(owner, tokenIdLand);
		super._setTokenURI(tokenIdLand, tokenUri);

		// _tokenIds++;

    }

    // function reveal(address owner, uint tokenId, string memory tokenKey, bytes memory signature, address buyer) public view returns (uint) {
    function reveal(address _owner, uint _tokenId, string memory _dataKey, bytes memory _signature, address _buyer) public {

		emit Reveal(_owner, _dataKey);

		bytes32 message = keccak256(abi.encodePacked(_owner, _dataKey, _buyer));
   		bytes32 preFixedMessage = message.toEthSignedMessageHash();
    
    	// Confirm the signature came from the owner, same as web3.eth.sign(...)
    	require(_owner == preFixedMessage.recover(_signature));
    	
    	// bioIndexes[_tokenId].redeemablePrice = 
    	// oracleClient.requestMultiplierPrice(_dataKey, 30);

    	// set nft URI
    	super._setTokenURI(_tokenId, _dataKey);
    	super.approve(address(this), _tokenId);

    	super.transferFrom(tokenHolderByIndex[_tokenId], _buyer, _tokenId);

		// return funds back to owner
	}

	function redeem(uint _tokenId, address _assetAddress, string memory _dataKey) public {
		// TODO: transfer Bio NFT to land owner

		require(bioIndexes[_tokenId].toBeOwner == msg.sender, "msg.sender must match toBeOwner");

		bioIndexes[_tokenId].redeemablePrice = 1 * oracleClient.getMultiplier(_dataKey);

    	// super.approve(msg.sender, _tokenId);

    	// IERC20(_assetAddress).approve(address(this), bioIndexes[_tokenId].redeemablePrice);
        // IERC20(_assetAddress).transfer(landIndexes[tokenIdLand + 1], bioIndexes[_tokenId].redeemablePrice);
    	// super.transferFrom(address(this), msg.sender, _tokenId);

	}
}