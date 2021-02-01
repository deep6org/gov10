import { IERC20, IERC721, ILendingPool, IProtocolDataProvider, IStableDebtToken } from './Interfaces.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';

import './OracleClient.sol';

contract Claimable is Ownable {

  using ECRecovery for bytes32;
  
  mapping(address => uint) public nonces_;

  function claim(string _tokenURI, bytes _sig, address _contractAddress) public returns(bool) {
    
    // Recreate the message, which also confirms the msg.sender matches the arguments in the signature
    bytes32 message = keccak256(abi.encodePacked(msg.sender, _tokenURI, nonces_[msg.sender]++, _contractAddress));
    bytes32 preFixedMessage = message.toEthSignedMessageHash();
    
    // Confirm the signature came from the owner, same as web3.eth.sign(...)
    require(owner == ECRecovery.recover(preFixedMessage, _sig));

    return true;
  }

}


contract NFTFactory is ERC721, OracleClient, Claimable {

	using ECRecovery for bytes32;

	struct Land {
		uint id;
		uint price;
		bytes agreement;
		uint period
	}

	struct Bio {
		uint id;
		uint redeemablePrice;
		address toBeOwner;
		bytes hashedLocation;
	}

	event Reveal(address indexed owner, bytes indexed dataKey);

	mapping(uint => Land) public landIndexes;
	mapping(uint => Bio) public bioIndexes;

	constructor() ERC721("Gov10", "GOV10") public {
		// set rate cap dynamically
	}

    // function 
    function issueNFTCommitment(address owner, uint price, uint weeksAfter, bytes memory dataHash) public {
    	// bio NFT to delegator, and land to 
    	uint tokenId = super.totalSupply();

    	// cap on price ownership
    	// require(cap <= 0.5)

    	// creates the bio nft
    	Bio bio = Bio(tokenId, price * 0.2, owner, dataHash);
    	bioIndexes[id] = bio;

    	Land land = Land(tokenId, priceLand, dataHash, time);
    	landIndexes[id] = land;

    	// 
    	super.approve(address(this), tokenId);

		super._safeMint(msg.sender, tokenId, data);

		_tokenIds++;
    }

    function reveal(address owner, uint tokenId, bytes memory _dataKey, memory bytes salt) public {
		// get hash,
		// unpack & see that it equals
		// check to ensure key
		// emit in an event
		emit Reveal(owner, _dataKey)

		bytes32 message = keccak256(abi.encodePacked(owner, _dataKey, salt));
   		bytes32 preFixedMessage = message.toEthSignedMessageHash();
    
    	// Confirm the signature came from the owner, same as web3.eth.sign(...)
    	require(owner == ECRecovery.recover(preFixedMessage, _sig));

    	// set nft URI
    	super._setTokenURI(tokenId, _dataKey)

		// makeTransfer
		// return funds back to owner

	}

	function redeem(bytes _tokenURI, bytes memory _sig) public {
		// TODO: transfer Bio NFT to land owner

		// Claim and record the nonce
    	require(super.claim(_tokenURI, _sig, address(this)), "Signature is invalid");
	}
}