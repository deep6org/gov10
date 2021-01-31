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

	struct Land {
		uint id;
		uint price;
		bytes agreement;
		uint x;
		uint y;
	}

	struct Bio {
		uint id;
		uint redeemablePrice;
		bytes location;
	}

	mapping(uint => Land) public land;

	constructor() ERC721("Gov10", "GOV10") public {}

    // function 
    function issue(address owner, bytes memory data) public {
    	// bio NFT to delegator, and land to 
    	uint tokenId = super.totalSupply() + 1;

		super._safeMint(owner, tokenId, data);

		// TODO: create struct
    }

	function redeem(address redeemer, bytes _tokenURI, bytes _sig) public {
		// TODO: transfer Bio NFT to land owner

		// Claim and record the nonce
    	require(super.claim(_tokenURI, _sig, address(this)), "Signature is invalid");


	}

	function reveal() public {
		// get hash,
		// unpack & see that it equals
		// emit in an event
	}
}