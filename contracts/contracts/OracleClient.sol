pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";


contract OracleClient is ChainlinkClient {
  uint256 private ORACLE_PAYMENT = 0.1 * 10 ** 18;
    
    address private oracle;
    bytes32 private jobId;
    
    uint public currentPrice;
    mapping(bytes32 => uint) public multipliers;
    
  constructor() public {
    setPublicChainlinkToken();
    oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
    jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
  }
  
  mapping(string => uint) public tokenToMultiplier;
  mapping(bytes32 => string) public receipts;
  
  event MultiplierUpdated(string _asset, uint256 _mul);

    function requestMultiplierPrice(string memory _dataHash, uint _window) public returns (bytes32) 
    {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillCallback.selector);
        req.add("get", "http://marketmake.ngrok.io");
        string memory params = string(abi.encodePacked("key=",_dataHash ,"&","window=",uint2str(_window)));
  
        req.add("queryParams", params);
        req.add("path", "data.mul");
        req.addInt("times", 10**18);
        
        bytes32 res = sendChainlinkRequestTo(oracle, req, ORACLE_PAYMENT);
        receipts[res] = _dataHash;
        return res;
    }
  
    function fulfillCallback(bytes32 _requestId, uint256 _multiplier) public recordChainlinkFulfillment(_requestId){
        emit MultiplierUpdated(receipts[_requestId], _multiplier);
        tokenToMultiplier[receipts[_requestId]] = _multiplier;
        delete receipts[_requestId];
    }
    
    function getMultiplier(string memory _dataHash) public view returns (uint) {
        return tokenToMultiplier[_dataHash];
    }
  
    
     function uint2str(uint256 _i) internal pure returns (string memory str)
    {

      if (_i == 0) return "0";

      uint256 j = _i;
      uint256 length;

      while (j != 0)
      {
        length++;
        j /= 10;
      }

      bytes memory bstr = new bytes(length);
      uint256 k = length;
      j = _i;

      while (j != 0)
      {
        bstr[--k] = bytes1(uint8(48 + j % 10));
        j /= 10;
      }

      str = string(bstr);
    }

  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }

  function withdrawLink() public {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }

  function cancelRequest(
    bytes32 _requestId,
    uint256 _payment,
    bytes4 _callbackFunctionId,
    uint256 _expiration
  )
    public
  {
    cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
  }

  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly { // solhint-disable-line no-inline-assembly
      result := mload(add(source, 32))
    }
  }

}

 // TODO: use ChainLink price feed here
// contract OracleClient {

// 	constructor(){}

// 	function getMultiplierEstimate () public view returns (uint) {
// 		return 42;
// 	}
// }