const { expect } = require("chai");
const { parseUnits, formatUnits } = require("@ethersproject/units");

const { ethers } = require("hardhat");
const erc20Abi = [{
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
                  },
                  {
                      "constant": false,
                      "inputs": [
                          {
                              "name": "_spender",
                              "type": "address"
                          },
                          {
                              "name": "_value",
                              "type": "uint256"
                          }
                      ],
                      "name": "approve",
                      "outputs": [
                          {
                              "name": "",
                              "type": "bool"
                          }
                      ],
                      "payable": false,
                      "stateMutability": "nonpayable",
                      "type": "function"
                  },
                  {
                      "constant": true,
                      "inputs": [],
                      "name": "totalSupply",
                      "outputs": [
                          {
                              "name": "",
                              "type": "uint256"
                          }
                      ],
                      "payable": false,
                      "stateMutability": "view",
                      "type": "function"
                  },
                  {
                      "constant": false,
                      "inputs": [
                          {
                              "name": "_from",
                              "type": "address"
                          },
                          {
                              "name": "_to",
                              "type": "address"
                          },
                          {
                              "name": "_value",
                              "type": "uint256"
                          }
                      ],
                      "name": "transferFrom",
                      "outputs": [
                          {
                              "name": "",
                              "type": "bool"
                          }
                      ],
                      "payable": false,
                      "stateMutability": "nonpayable",
                      "type": "function"
                  },
                  {
                      "constant": true,
                      "inputs": [],
                      "name": "decimals",
                      "outputs": [
                          {
                              "name": "",
                              "type": "uint8"
                          }
                      ],
                      "payable": false,
                      "stateMutability": "view",
                      "type": "function"
                  },
                  {
                      "constant": true,
                      "inputs": [
                          {
                              "name": "_owner",
                              "type": "address"
                          }
                      ],
                      "name": "balanceOf",
                      "outputs": [
                          {
                              "name": "balance",
                              "type": "uint256"
                          }
                      ],
                      "payable": false,
                      "stateMutability": "view",
                      "type": "function"
                  },
                  {
                      "constant": true,
                      "inputs": [],
                      "name": "symbol",
                      "outputs": [
                          {
                              "name": "",
                              "type": "string"
                          }
                      ],
                      "payable": false,
                      "stateMutability": "view",
                      "type": "function"
                  },
                  {
                      "constant": false,
                      "inputs": [
                          {
                              "name": "_to",
                              "type": "address"
                          },
                          {
                              "name": "_value",
                              "type": "uint256"
                          }
                      ],
                      "name": "transfer",
                      "outputs": [
                          {
                              "name": "",
                              "type": "bool"
                          }
                      ],
                      "payable": false,
                      "stateMutability": "nonpayable",
                      "type": "function"
                  },
                  {
                      "constant": true,
                      "inputs": [
                          {
                              "name": "_owner",
                              "type": "address"
                          },
                          {
                              "name": "_spender",
                              "type": "address"
                          }
                      ],
                      "name": "allowance",
                      "outputs": [
                          {
                              "name": "",
                              "type": "uint256"
                          }
                      ],
                      "payable": false,
                      "stateMutability": "view",
                      "type": "function"
                  },
                  {
                      "payable": true,
                      "stateMutability": "payable",
                      "type": "fallback"
                  },
                  {
                      "anonymous": false,
                      "inputs": [
                          {
                              "indexed": true,
                              "name": "owner",
                              "type": "address"
                          },
                          {
                              "indexed": true,
                              "name": "spender",
                              "type": "address"
                          },
                          {
                              "indexed": false,
                              "name": "value",
                              "type": "uint256"
                          }
                      ],
                      "name": "Approval",
                      "type": "event"
                  },
                  {
                      "anonymous": false,
                      "inputs": [
                          {
                              "indexed": true,
                              "name": "from",
                              "type": "address"
                          },
                          {
                              "indexed": true,
                              "name": "to",
                              "type": "address"
                          },
                          {
                              "indexed": false,
                              "name": "value",
                              "type": "uint256"
                          }
                      ],
                      "name": "Transfer",
                      "type": "event"
                  }]

const lendingDataProviderAbi =[
    {
      "inputs": [
        {
          "internalType": "contract ILendingPoolAddressesProvider",
          "name": "addressesProvider",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "ADDRESSES_PROVIDER",
      "outputs": [
        {
          "internalType": "contract ILendingPoolAddressesProvider",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllATokens",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            }
          ],
          "internalType": "struct AaveProtocolDataProvider.TokenData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllReservesTokens",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            }
          ],
          "internalType": "struct AaveProtocolDataProvider.TokenData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        }
      ],
      "name": "getReserveConfigurationData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "decimals",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ltv",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidationThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidationBonus",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveFactor",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "usageAsCollateralEnabled",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "borrowingEnabled",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "stableBorrowRateEnabled",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isFrozen",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        }
      ],
      "name": "getReserveData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "availableLiquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalStableDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalVariableDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidityRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "variableBorrowRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stableBorrowRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "averageStableBorrowRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidityIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "variableBorrowIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint40",
          "name": "lastUpdateTimestamp",
          "type": "uint40"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        }
      ],
      "name": "getReserveTokensAddresses",
      "outputs": [
        {
          "internalType": "address",
          "name": "aTokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "stableDebtTokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "variableDebtTokenAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getUserReserveData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "currentATokenBalance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "currentStableDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "currentVariableDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "principalStableDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "scaledVariableDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stableBorrowRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidityRate",
          "type": "uint256"
        },
        {
          "internalType": "uint40",
          "name": "stableRateLastUpdated",
          "type": "uint40"
        },
        {
          "internalType": "bool",
          "name": "usageAsCollateralEnabled",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

const lendingPoolAbi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "reserve",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "onBehalfOf",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "borrowRateMode",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "borrowRate",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint16",
          "name": "referral",
          "type": "uint16"
        }
      ],
      "name": "Borrow",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "reserve",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "onBehalfOf",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint16",
          "name": "referral",
          "type": "uint16"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "target",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "initiator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "premium",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "referralCode",
          "type": "uint16"
        }
      ],
      "name": "FlashLoan",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "collateralAsset",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "debtAsset",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "debtToCover",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "liquidatedCollateralAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "liquidator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "receiveAToken",
          "type": "bool"
        }
      ],
      "name": "LiquidationCall",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "reserve",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "RebalanceStableBorrowRate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "reserve",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "repayer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Repay",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "reserve",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "liquidityRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "stableBorrowRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "variableBorrowRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "liquidityIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "variableBorrowIndex",
          "type": "uint256"
        }
      ],
      "name": "ReserveDataUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "reserve",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "ReserveUsedAsCollateralDisabled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "reserve",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "ReserveUsedAsCollateralEnabled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "reserve",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rateMode",
          "type": "uint256"
        }
      ],
      "name": "Swap",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "reserve",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "FLASHLOAN_PREMIUM_TOTAL",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "LENDINGPOOL_REVISION",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_NUMBER_RESERVES",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_STABLE_RATE_BORROW_SIZE_PERCENT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "interestRateMode",
          "type": "uint256"
        },
        {
          "internalType": "uint16",
          "name": "referralCode",
          "type": "uint16"
        },
        {
          "internalType": "address",
          "name": "onBehalfOf",
          "type": "address"
        }
      ],
      "name": "borrow",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "onBehalfOf",
          "type": "address"
        },
        {
          "internalType": "uint16",
          "name": "referralCode",
          "type": "uint16"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "balanceFromBefore",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "balanceToBefore",
          "type": "uint256"
        }
      ],
      "name": "finalizeTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiverAddress",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "assets",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "modes",
          "type": "uint256[]"
        },
        {
          "internalType": "address",
          "name": "onBehalfOf",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "params",
          "type": "bytes"
        },
        {
          "internalType": "uint16",
          "name": "referralCode",
          "type": "uint16"
        }
      ],
      "name": "flashLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAddressesProvider",
      "outputs": [
        {
          "internalType": "contract ILendingPoolAddressesProvider",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        }
      ],
      "name": "getConfiguration",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            }
          ],
          "internalType": "struct DataTypes.ReserveConfigurationMap",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        }
      ],
      "name": "getReserveData",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "data",
                  "type": "uint256"
                }
              ],
              "internalType": "struct DataTypes.ReserveConfigurationMap",
              "name": "configuration",
              "type": "tuple"
            },
            {
              "internalType": "uint128",
              "name": "liquidityIndex",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "variableBorrowIndex",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "currentLiquidityRate",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "currentVariableBorrowRate",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "currentStableBorrowRate",
              "type": "uint128"
            },
            {
              "internalType": "uint40",
              "name": "lastUpdateTimestamp",
              "type": "uint40"
            },
            {
              "internalType": "address",
              "name": "aTokenAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "stableDebtTokenAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "variableDebtTokenAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "interestRateStrategyAddress",
              "type": "address"
            },
            {
              "internalType": "uint8",
              "name": "id",
              "type": "uint8"
            }
          ],
          "internalType": "struct DataTypes.ReserveData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        }
      ],
      "name": "getReserveNormalizedIncome",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        }
      ],
      "name": "getReserveNormalizedVariableDebt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getReservesList",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getUserAccountData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "totalCollateralETH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalDebtETH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "availableBorrowsETH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "currentLiquidationThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ltv",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "healthFactor",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getUserConfiguration",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            }
          ],
          "internalType": "struct DataTypes.UserConfigurationMap",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "aTokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "stableDebtAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "variableDebtAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "interestRateStrategyAddress",
          "type": "address"
        }
      ],
      "name": "initReserve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ILendingPoolAddressesProvider",
          "name": "provider",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "collateralAsset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "debtAsset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "debtToCover",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "receiveAToken",
          "type": "bool"
        }
      ],
      "name": "liquidationCall",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "rebalanceStableBorrowRate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rateMode",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "onBehalfOf",
          "type": "address"
        }
      ],
      "name": "repay",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "configuration",
          "type": "uint256"
        }
      ],
      "name": "setConfiguration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "val",
          "type": "bool"
        }
      ],
      "name": "setPause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "rateStrategyAddress",
          "type": "address"
        }
      ],
      "name": "setReserveInterestRateStrategyAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "useAsCollateral",
          "type": "bool"
        }
      ],
      "name": "setUserUseReserveAsCollateral",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "rateMode",
          "type": "uint256"
        }
      ],
      "name": "swapBorrowRateMode",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "withdraw",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

const daiFaucetAddress = "0x7CFAb6430acF23F6a45521144bc83Ad5C8c2E2aa";

let daiContractAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
const aDaiContractAddress = "0x6ddfd6364110e9580292d9ecc745f75dea7e72c8";

const creditExecutorAddress = "0xE5Bbf3E53b4855629fD72A9Fb4B9e35744a6a82c";
const LENDING_POOL_ADDRESS = "0x9FE532197ad76c5a68961439604C037EB79681F0";

describe("DAIFaucet", function() {

  before(async () => {
      console.log('Running the Before Function')
      const lendingDataProviderAddress = "0x744C1aaA95232EeF8A9994C4E0b3a89659D9AB79"
      let dataProviderContract = new ethers.Contract(lendingDataProviderAddress, lendingDataProviderAbi, ethers.provider);

      let _reserveTokens = await dataProviderContract.getAllReservesTokens()
      //.getReserveData("0x6B175474E89094C44Da98b954EedeAC495271d0F")
      //makeCall('getAddress', addressProviderContract, ["0x1"])
      _reserveTokens.forEach((pool) => {
        if(pool.symbol == 'DAI'){
          daiContractAddress = pool.tokenAddress
          console.log(`setting the dai contract to: ${daiContractAddress}`)
        }
      })
  })

  it('Swap Eth for DAI', async () => {

    const [owner] = await ethers.getSigners();
    console.log(owner.address)

    // TODO: Seperate out into scripts file for DaiFaucet deployment
    // const DAIFaucet = await ethers.getContractFactory("DAIFaucet");
    // on kovan
    // const v2RouterUniSwap = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    // const DaiAddress = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
    // const faucet = await DaiFaucet.deploy("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa");

    // send transaction
    console.log(ethers)

      // // Acccounts now exposed
      const params = [{
          from: owner.address,
          to: daiFaucetAddress,
          value: ethers.utils.parseUnits('0.01', 'ether').toHexString()
      }];

      console.log(params)

      const transactionHash = await ethers.provider.send('eth_sendTransaction', params)
      console.log('transactionHash is ' + transactionHash);    
      // get balance of dai from owner

  });

  it('sets greeting deposit', async() => {
    const contract = await ethers.getContractAt("CreditExecutor", creditExecutorAddress);
    console.log(contract)

    // let contract = new ethers.Contract(contractAddress, abi, ethers.provider);
    const res = await contract.setGreeting("howdie")
    console.log(res)

  })

  it('sets greeting deposit', async() => {
    const contract = await ethers.getContractAt("CreditExecutor", creditExecutorAddress);

    const res2 = await contract.getGreeting()
    console.log(res2)

  })

  it('gets all possible reserve data from the protocol', async () => {
      const lendingDataProviderAddress = "0x744C1aaA95232EeF8A9994C4E0b3a89659D9AB79"
      let dataProviderContract = new ethers.Contract(lendingDataProviderAddress, lendingDataProviderAbi, ethers.provider);

      let _reserveTokens = await dataProviderContract.getAllReservesTokens()
      //.getReserveData("0x6B175474E89094C44Da98b954EedeAC495271d0F")
      //makeCall('getAddress', addressProviderContract, ["0x1"])

      _reserveTokens.forEach((pool) => {
        if(pool.symbol == 'DAI'){
          daiContractAddress = pool.tokenAddress
          console.log(`setting the dai contract to: ${daiContractAddress}`)
        }
      })
      

      expect(_reserveTokens.length > 0)
  })

  it('gets the account informatio', async () => {

    const [owner] = await ethers.getSigners();

    let lendingPoolContract = new ethers.Contract(LENDING_POOL_ADDRESS, lendingPoolAbi, ethers.provider);

    let _accountData = await lendingPoolContract.getUserAccountData(owner.address)
    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    // let contract = new ethers.Contract(daiContractAddress, abi, ethers.provider);
    // const balance = await contract.balanceOf(owner.address)
    console.log(_accountData)
  })

  // it('gets DAI balance', async () => {
  it.only('gets DAI balance', async () => {
    const [owner] = await ethers.getSigners();

    // The address from the above deployment example
    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(daiContractAddress, erc20Abi, ethers.provider);
    const balance = await contract.balanceOf(owner.address)
    console.log(balance.toString())

  })

  it('sets amount of approval into the pool', async() => {
  // it.only('sets amount of approval into the pool', async() => {

    const [owner] = await ethers.getSigners();
    let amount = 20;
    let amountToDeposit = parseUnits(amount.toString(), 18)
    let amountToApprove = amountToDeposit;

    console.log('deposit', amountToDeposit.toString())
    let daiContract = new ethers.Contract(daiContractAddress, erc20Abi, owner);
    let res = await daiContract.approve(creditExecutorAddress, amountToApprove)
    console.log(res)
    console.log('approval')
        // perform test to see allowance
    let allowance = await daiContract.allowance(owner.address, creditExecutorAddress)
    console.log("allowance")
    console.log(allowance.toString())

  })

  it('depositCollateral in the pool', async () => {
  // it.only('depositCollateral in the pool', async () => {
    const [owner] = await ethers.getSigners();
    let amount = 10;
    let amountToDeposit = parseUnits(amount.toString(), 18)
    console.log('deposit', amountToDeposit.toString())

    const creditExecutor = await ethers.getContractAt("CreditExecutor", creditExecutorAddress);
    // deposit
    const res = await creditExecutor.depositCollateral(daiContractAddress, amountToDeposit, true)
    console.log(res)
  })
  
  it('gives the borrower power', async () => {
  // it.only('gives the borrower power', async () => {
    const [owner, borrower] = await ethers.getSigners();

    console.log(`Owner: ${owner}`)
    console.log(`Borrower: ${borrower}`)

    let amount = 10;
    let amountToBorrow = parseUnits(amount.toString(), 18)
    console.log('deposit', amountToBorrow.toString())

    const creditExecutor = await ethers.getContractAt("CreditExecutor", creditExecutorAddress);
    const res = await creditExecutor.approveBorrower(borrower.address, amountToBorrow, daiContractAddress)
    console.log(res)
  })

  it('gets the dai balance of the borrower', async () => {
  // it.only('gets the dai balance of the borrower', async () => {
    const [_, borrower] = await ethers.getSigners();

    // The address from the above deployment example
    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(daiContractAddress, erc20Abi, ethers.provider);
    const balance = await contract.balanceOf(borrower.address)
    console.log(balance.toString())
  })

  it('borrows the collateral', async() => {
  // it.only('borrows the collateral', async() => {
    const [owner, borrower] = await ethers.getSigners();

    console.log(`Owner: ${owner.address}`)
    console.log(`Borrower: ${borrower.address}`)

    let amount = 5;
    let amountToBorrow = parseUnits(amount.toString(), 18)
    console.log('borrowing', amountToBorrow.toString())


        // Borrow the relevant amount
    const assetToBorrow = daiContractAddress; // E.g. the address for Dai
    const amountToBorrowInWei = amountToBorrow; // must be equal to or less than the amount delegated to the borrower
    const interestRateMode = 1; // must be of the same type as the debt token that is delegated. I.e. stable = 1, variable = 2.
    const referralCode = 0;
    const delegatorAddress = creditExecutorAddress;

    // const creditExecutor = await ethers.getContractAt("CreditExecutor", creditExecutorAddress, borrower);

    let lendingPoolContract = new ethers.Contract(LENDING_POOL_ADDRESS, lendingPoolAbi, borrower);

    let res = await lendingPoolContract.borrow(
                                                    assetToBorrow,
                                                    amountToBorrowInWei,
                                                    interestRateMode,
                                                    referralCode,
                                                    creditExecutorAddress
                                                  )

    // let res = await creditExecutor.borrow(
    //                               assetToBorrow,
    //                               amountToBorrowInWei,
    //                               interestRateMode,
    //                               referralCode
    //                               // creditExecutor
    //                           )

    // const creditExecutor = await ethers.getContractAt("CreditExecutor", creditExecutorAddress, borrower);
    // const res = await creditExecutor.withdrawCollateral(daiContractAddress)
    console.log(res)
  });

  it('allows a borrower to repays debt', async() => {
  // it.only('allows a borrower to repay debt', async() => {
    const [owner, borrower] = await ethers.getSigners();

    let amount = 5;
    let amountToApprove = parseUnits(amount.toString(), 18);

    let daiContract = new ethers.Contract(daiContractAddress, erc20Abi, borrower);
    let res = await daiContract.approve(creditExecutorAddress, amountToApprove)
    console.log(res)

    let lendingPoolContract = new ethers.Contract(LENDING_POOL_ADDRESS, lendingPoolAbi, borrower);

    let res = await lendingPoolContract.approveBorrower(
                                                assetToBorrow,
                                                amountToBorrowInWei,
                                                interestRateMode,
                                                referralCode,
                                                creditExecutorAddress
                                              )


  })

    // it('allowance of a borrower', async() => {
  it.only('allowance of a borrower', async() => {
    const [owner, borrower] = await ethers.getSigners();

    let daiContract = new ethers.Contract(daiContractAddress, erc20Abi, borrower);

                // perform test to see allowance
    let allowance = await daiContract.allowance(borrower.address, creditExecutorAddress)
    console.log("allowance of borrower")
    console.log(allowance.toString())
  })

  // it('a borrower repays collateral', async() => {
  it.only('a borrower repays loan with js', async() => {

    const [owner, borrower] = await ethers.getSigners();

    console.log(`Owner: ${owner.address}`)
    console.log(`Borrower: ${borrower.address}`)

    let amount = 5;
    let assetToRepay = daiContractAddress;
    console.log(`dai_contract: ${assetToRepay}`)
    let amountToRepay = parseUnits(amount.toString(), 18)
    console.log('borrow repayment', amountToRepay.toString())

    const creditExecutor = await ethers.getContractAt("CreditExecutor", creditExecutorAddress, borrower);

    let lendingPoolContract = new ethers.Contract(LENDING_POOL_ADDRESS, lendingPoolAbi, borrower);

    let res = await lendingPoolContract.borrow(
                                                assetToBorrow,
                                                amountToBorrowInWei,
                                                interestRateMode,
                                                referralCode,
                                                creditExecutorAddress
                                              )

    let res = await creditExecutor.repayBorrower(
                              amountToRepay,
                              assetToRepay
                          )

    console.log(res)
  })

  it('a borrower repays loan', async() => {
    const [owner, borrower] = await ethers.getSigners();

    console.log(`Owner: ${owner.address}`)
    console.log(`Borrower: ${borrower.address}`)

    let amount = 5;
    let assetToRepay = daiContractAddress;
    console.log(`dai_contract: ${assetToRepay}`)
    let amountToRepay = parseUnits(amount.toString(), 18)
    console.log('borrow repayment', amountToRepay.toString())

    const creditExecutor = await ethers.getContractAt("CreditExecutor", creditExecutorAddress, borrower);

    let res = await creditExecutor.repayBorrower(
                              amountToRepay,
                              assetToRepay
                          )

    console.log(res)    
  })

  // it.only(`gets the dai balance from contract ${daiContractAddress}`, async () => {
  // it.only(`gets the dai balance from contract ${daiContractAddress}`, async () => {

  // })

  it.only(`gets the dai balance from contract ${daiContractAddress}`, async () => {
    const [owner, borrower] = await ethers.getSigners();

    // The address from the above deployment example
    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract

    let contract = new ethers.Contract(daiContractAddress, erc20Abi, ethers.provider);
    let balance = await contract.balanceOf(creditExecutorAddress)

    console.log(`credit executor: ${balance.toString()}`)

    balance = await contract.balanceOf(borrower.address)
    console.log(`borrower ${borrower.address} balance: ${balance.toString()}`)

    balance = await contract.balanceOf(creditExecutorAddress)
    console.log(`creditExecutorAddress ${creditExecutorAddress} balance: ${balance.toString()}`)


    balance = await contract.balanceOf(owner.address)
    console.log(`owner ${owner.address} balancer: ${balance.toString()}`)

    console.log('------- a token balances ---------')

    let aContract = new ethers.Contract(aDaiContractAddress, erc20Abi, ethers.provider);
    balance = await aContract.balanceOf(creditExecutorAddress)
    console.log(`creditExecutorAddress of ${owner.address} aBalance: ${balance.toString()}`)

  })

  it(`withdraws the collateral balance`, async () => {

  })


  // check allowance
})