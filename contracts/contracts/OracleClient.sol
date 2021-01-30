

// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.3;

import { IERC20, IERC721, ILendingPool, IProtocolDataProvider, IStableDebtToken } from './Interfaces.sol';
import { SafeERC20 } from './Libraries.sol';

/**
 * This is a proof of concept starter contract, showing how uncollaterised loans are possible
 * using Aave v2 credit delegation.
 * This example supports stable interest rate borrows.
 * It is not production ready (!). User permissions and user accounting of loans should be implemented.
 * See @dev comments
 */
 
 // TODO: use ChainLink price feed here
contract OracleClient {

	constructor(){}

	function getPrice () public returns (uint256) {
		return 100;
	}
}