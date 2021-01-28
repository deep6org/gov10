import React, {useState } from 'react'
import './index.css'
import { Link, useHistory } from 'react-router-dom'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

let ethersProvider;

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
})

// const makeCall = async (callName, contract, args, metadata={}) => {
//   if(contract[callName]) {
//     let result
//     if(args) {
//       result = await contract[callName](...args, metadata)
//     } else {
//       result = await contract[callName]()
//     }
//     return result
//   } else {
//     console.log('no call of that name!')
//   }
// }

// const getBalance = async (_token, _account, _contract) => {
// 	let newBalance
// 	if(_token === 'ETH') {
// 	  newBalance = await selectedProvider.getBalance(_account)

// 	} else {
// 	  newBalance = await makeCall('balanceOf', _contract, [_account])
// 	}
// 	return newBalance
// }

function getLibrary(provider) {
	console.log(provider)
	// const provider = new ethers.providers.AlchemyProvider
	// const provider = 
	ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
	console.log(ethersProvider.getSigner())

  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React()

  // get dai balance

  const onClick = () => {
    activate(injectedConnector)
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div >Account: {account ? account.substring(0,5)+'...' : ''}</div>
      {active ? (
        <div className="flow">✅ </div>
      ) : (
        <Button name="connect" onClick={onClick}/>
      )}
    </div>
  )
}

// 
const swapClick = () => {
	console.log('swap')
	console.log(ethersProvider.getSigner().address)
}

const approveClick = () => {
	console.log('approve')
}

const depositClick = () => {
	console.log('deposit')
}

const Button = (props) => {
	return(<button type="button" className="but" onClick={props.onClick}>{props.name}</button>)
}

const Account = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet />
      {/*wallet*/}

  		{/*swap*/}
      <br />
      <br />
      <br />
  		<Button name={"Swap"} onClick={swapClick}/>
  		<Button name={"Approve"} onClick={approveClick}/>
  		<Button name={"Deposit"} onClick={depositClick}/>

  		{/*approve*/}

  		{/*deposit*/}
    </Web3ReactProvider>
  )
}



export default Account

