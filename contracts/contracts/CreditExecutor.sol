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
 
contract CreditExecutor {
    using SafeERC20 for IERC20;
    
    ILendingPool constant lendingPool = ILendingPool(address(0x9FE532197ad76c5a68961439604C037EB79681F0)); // Kovan
    IProtocolDataProvider constant dataProvider = IProtocolDataProvider(address(0x744C1aaA95232EeF8A9994C4E0b3a89659D9AB79)); // Kovan
    
    address public owner;
    string public greet;

    NFTFactory public nftFactory;

    mapping(address => address) public agreements;
    mapping(address => uint) public aBalances;

    constructor (address nftFactoryAddress, address oracleClientAddress) public {
        owner = msg.sender;
        // pass in nft address
        nftFactory = NFTFactory(address(nftFactoryAddress));
        oracleClient = OracleClient(address(oracleClientAddress));
    }

    // for testing purposes
    function setGreeting(string memory _greeting) public {
        greet = _greeting;
    }

    // for testing purposes
    function getGreeting() public view returns(string memory greet){
        return greet;
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

        // perform swap on eth to dai
        aBalances[msg.sender] = aBalances[msg.sender] + amount;

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
        agreements[msg.sender] = borrower;

        // get price 
        uint price = oracleClient.getPrice()

        // prepare 1 nft token to delegator on gov10 (land + bio)
        // mint bio token as confidence
        // nftFactory.issue(msg.sender)
        nftFactory.issueNFTCommitment(msg.sender, price, weeksAfter, data)

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
     */
    function repayBorrowerWithNFT(uint256 amount, address asset) public {
        IERC20(asset).safeTransferFrom(msg.sender, address(this), amount);
        IERC20(asset).safeApprove(address(lendingPool), amount);

        // delegatee can pay with bionft token or original swapped funds
        // swap nft to this contract
        // get price of the nft from the oracleClient
        // subtract price of nft from the internal account
        // swap
        // 

        // lendingPool.repay(asset, amount, 1, address(this));
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
    function withdrawCollateral(address asset) public {
        (address aTokenAddress,,) = dataProvider.getReserveTokensAddresses(asset);
        uint256 assetBalance = IERC20(aTokenAddress).balanceOf(address(this));
        lendingPool.withdraw(asset, assetBalance, owner);

        // on withdraw of collateral, erc721 token is minted
    }
}