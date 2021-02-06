// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.3;

import { IERC20, IERC721, ILendingPool, IProtocolDataProvider, IStableDebtToken } from './Interfaces.sol';
import { SafeERC20 } from './Libraries.sol';
import './NFTFactory.sol';
import './OracleClient.sol';

/**
 * This is a proof of concept starter contract, showing how uncollaterised loans are possible
 * using Aave v2 credit delegation.
 * This example supports stable interest rate borrows.
 * It is not production ready (!). User permissions and user accounting of loans should be implemented.
 * See @dev comments
 */
 
contract CreditExecutor is OracleClient {
    using SafeERC20 for IERC20;
    
    ILendingPool constant lendingPool = ILendingPool(address(0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe)); // Kovan
    IProtocolDataProvider constant dataProvider = IProtocolDataProvider(address(0x3c73A5E5785cAC854D468F727c606C07488a29D6)); // Kovan
    
    address public owner;
    uint public capAttenRate; // capital attention rate

    NFTFactory public nftFactory;
    OracleClient public oracleClient;

    mapping(address => address) public agreements;
    mapping(address => uint256) public aBalances;

    constructor (address nftFactoryAddress, address oracleClientAddress) public {
        owner = msg.sender;
        // pass in nft address
        nftFactory = NFTFactory(address(nftFactoryAddress));
        oracleClient = OracleClient(address(oracleClientAddress));
        capAttenRate = 10; // cap / 100
    }

    /** 
        * @dev This calls an estimate for the market
    */
    function quote() public returns(uint256 value) {
        return oracleClient.getMultiplierEstimate();
    }

    /** 
        * @dev for testing
    */
    function dummyDeposit(uint depositAmount, string memory _dataKey) public view returns(uint staked) {
        return oracleClient.getMultiplierEstimate(_dataKey) * capAttenRate * depositAmount;
    }

    /**
     * Deposits collateral into the Aave, to enable credit delegation
     * This would be called by the delegator.
     * @param asset The asset to be deposited as collateral
     * @param amount The amount to be deposited as collateral
     * @param isPull Whether to pull the funds from the caller, or use funds sent to this contract
     *  User must have approved this contract to pull funds if `isPull` = true
     * 
     */
    function depositCollateral(address asset, uint256 amount, bool isPull) public {
        if (isPull) {
            IERC20(asset).safeTransferFrom(msg.sender, address(this), amount);
        }
        IERC20(asset).safeApprove(address(lendingPool), amount);

        // // perform swap on eth to dai
        // if(aBalances[msg.sender]){
        //     aBalances[msg.sender] = aBalances[msg.sender] + amount;
        // }else{
            
        // }

        lendingPool.deposit(asset, amount, address(this), 0);
    }

    // function getABalance() public {

    // }

    /**
     * Approves the borrower to take an uncollaterised loan
     * @param borrower The borrower of the funds (i.e. delgatee)
     * @param amount The amount the borrower is allowed to borrow (i.e. their line of credit)
     * @param asset The asset they are allowed to borrow
     * 
     * Add permissions to this call, e.g. only the owner should be able to approve borrowers!
     */
    function approveBorrower(address borrower, uint256 amount, address asset, uint weeksAfter, bytes memory data) public {
        (, address stableDebtTokenAddress,) = dataProvider.getReserveTokensAddresses(asset);

        // take in an array of borrower(s), maybe v1 just be about a single borrower
        // store addresses as data access
        
        // agreements[msg.sender] = borrower;

        // get price 
        
        // uint price = oracleClient.getPrice()

        // prepare 1 nft token to delegator on gov10 (land + bio)
        // mint bio token as confidence
        // nftFactory.issue(msg.sender)

        nftFactory.issueNFTCommitment(msg.sender, price, weeksAfter, data)

        // IERC20(asset).approve(address(this), amount * cap);

        // repayment terms are set to borrower, price of nft is stated with schedule
        IStableDebtToken(stableDebtTokenAddress).approveDelegation(borrower, amount);
    }

        // Enables the asset to be used as collateral
    function setUserUseReserveAsCollateral(address asset) public {

        lendingPool.setUserUseReserveAsCollateral(asset, true);
    }
    
    /**
     * Repay an uncollaterised loan
     * @param amount The amount to repay
     * @param asset The asset to be repaid
     * 
     * User calling this function must have approved this contract with an allowance to transfer the tokens
     * 
     * You should keep internal accounting of borrowers, if your contract will have multiple borrowers
     */
    function repayBorrower(uint256 amount, address asset) public {
        IERC20(asset).transferFrom(msg.sender, address(this), amount);
        IERC20(asset).approve(address(lendingPool), amount);

        lendingPool.repay(asset, amount, 1, address(this));
    }   

    /**
     * Repay an uncollaterised loan
     * @param amount The amount to repay
     * @param asset The asset to be repaid
     * 
     * User calling this function must have approved this contract with an allowance to transfer the tokens
     * 
     * You should keep internal accounting of borrowers, if your contract will have multiple borrowers
     * // delegatee can pay with bionft token or original swapped funds
     */
    function repayBorrowerWithNFT(uint256 amount, address asset, uint256 tokenId) public {

        // redeem will call transfer NFT
        uint price = 0;
        // uint price = nftFactory.reveal(tokenId);


        IERC20(asset).safeTransferFrom(msg.sender, address(this), amount + price);
        // IERC20(asset).safeApprove(address(lendingPool), amount + price);


        // swap nft to this contract
        // get price of the nft from the oracleClient
        // subtract price of nft from the internal account

        lendingPool.repay(asset, amount + price, 1, address(this));
    }

    // function repayBorrowerWithBio() public {
        // pass in address
        // check to see the quality / future value of brain data
        // 
    // }
    
    /**
     * Withdraw all of a collateral as the underlying asset, if no outstanding loans delegated
     * @param asset The underlying asset to withdraw
     * 
     * Add permissions to this call, e.g. only the owner should be able to withdraw the collateral!
     */
    function withdrawCollateral(address asset, uint amount) public {
        (address aTokenAddress,,) = dataProvider.getReserveTokensAddresses(asset);
        uint256 assetBalance = IERC20(aTokenAddress).balanceOf(msg.sender);
        lendingPool.withdraw(asset, amount, address(this)); 
        // on withdraw of collateral, erc721 token is minted
        // store balance in this contract
        // repay with rug pull
    }

      /*
    * Rugpull yourself to drain all ETH and ERC20 tokens from the contract
    */
    function rugPull(address _erc20Asset) public payable {

        // withdraw all ETH
        msg.sender.call{ value: address(this).balance }("");

        // withdraw all x ERC20 tokens
        IERC20(_erc20Asset).transfer(msg.sender, IERC20(_erc20Asset).balanceOf(address(this)));

    }
}