import React, {useState } from 'react'
import './index.css'
import { Link, useHistory } from 'react-router-dom'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

import { abi as IErc20 } from './abis/erc20.json'

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

  if(active){
  	const address = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD'
  	var contract = new ethers.Contract(address, IErc20, ethersProvider);
  	contract.balanceOf(account).then((res) => {
    	console.log(res.toString())
  	})
  }
  // get dai balance

  const onClick = () => {
    activate(injectedConnector)

  }

  return (
    <div className="simple-form">
      <div >account: {account ? account.substring(0,5)+'...' : ''}</div>
      {active ? (
        <>

        	<div> ✅ </div>
        </>
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

	// input the contract abi, add in the address
	// add the ability to make a transaction
	// ethersProvider
}

const depositClick = () => {
	console.log('deposit')
}

const Input = (props) => {
	const [value, setValue] = useState({target: {value: ""}})
	console.log(value.target.value)
	return(<input className="input-num" onChange={setValue} />)
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
  		<Button name={"Swap"} onClick={swapClick}/>
  		<Button name={"Approve"} onClick={approveClick}/>
  		<Button name={"Deposit"} onClick={depositClick}/>

  		{/*approve*/}

  		{/*deposit*/}
    </Web3ReactProvider>
  )
}

const BorrowerAccount = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet />
      {/*wallet*/}

  		{/*swap*/}
      <br />
      	<div className="simple-form">
      	<Input />
  		<Button name={"Approve"} onClick={approveClick}/>
      	</div>

  		{/*approve*/}

  		{/*deposit*/}
    </Web3ReactProvider>
  )
}



export {BorrowerAccount}
export default Account

