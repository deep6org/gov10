import React, {useState, useEffect } from 'react'
import './index.css'
import { Link, useHistory } from 'react-router-dom'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { parseUnits, formatUnits, formatEther } from "@ethersproject/units";

import { abi as IErc20 } from './abis/erc20.json'
import { abi as ICreditExecutor } from './abis/creditExecutor.json'

let ethersProvider;
let daiContractAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
let creditExecutorAddress = "0x5e573955221AE2c061C534A20C8F5Ba2A15C23a8";

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

const getTokenBalance = async (_token, _account, _contract) => {
	let newBalance
	if(_token === 'ETH') {
	  newBalance = await ethersProvider.getBalance(_account)

	} else {
    try{
      console.log('_account')
      console.log(_account)
	    newBalance = await _contract.balanceOf(_account)
    }catch(e){
      console.log(e)
    }
	}
	return newBalance
}

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

const convertValue = (_amountInUnits, _decimals, _toEthMultiplier) => {
let decimals = _decimals ? _decimals : 18
let toEthMultiplier = _toEthMultiplier ? _toEthMultiplier : 1
return (parseFloat(formatUnits(_amountInUnits, decimals)) * toEthMultiplier)
}

const formattedValue = (_amountInUnits, _decimals, _toEthMultiplier) => {
return convertValue(_amountInUnits, _decimals, _toEthMultiplier).toLocaleString()
}

export const Wallet = (props) => {
  
  // const [active, setActive ] = useState(false)
  // const [account, setAccount ] = useState('')
  const { chainId, account, activate, active } = useWeb3React()

  // if(active){
  // 	const address = '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD'
  // 	var contract = new ethers.Contract(address, IErc20, ethersProvider);
  // }

    useEffect(async () => {
      console.log(`use effect -- account: ${account}`)
      console.log(ethersProvider)
      if(ethersProvider){

      const balance = await getTokenBalance(
          'DAI', 
          account, 
          new ethers.Contract("0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", IErc20, ethersProvider.getSigner())
          )
        console.log(balance)
        console.log(balance.toString())
        props.setBalance(formattedValue(balance, 18))
        props.setAccount(account)
      }else {
        console.log('provider NOT_SET')
      }

    }, [active,ethersProvider])

  	// if(active){
  	// 	console.log(`use effect ${account}`)
   //  	const balance = getTokenBalance(
   //  		'0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD', 
   //  		account, 
   //  		new ethers.Contract("0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", IErc20, ethersProvider)
   //  	)
   //  	setBalance(balance)
  	// }else {

   //  }
  // get dai balance

  const onClick = async () => {
      activate(injectedConnector)

      // setTimeout(async (account) => {
      //   console.log(`use effect ${account}`)
      //   const balance = await getTokenBalance(
      //     'DAI', 
      //     account, 
      //     new ethers.Contract("0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", IErc20, ethersProvider)
      //     )
      //   console.log(balance)
      // setBalance(balance)

      // }, 4000, account)
  }

  return (
    <div className="simple-form">
      <div >account: {account ? account.substring(0,5)+'...' : ''}</div>
      <div >dai balance: {props.balance}</div>
      {active ? (
        <>

        	<div> ✅ </div>
        </>
      ) : (
        <Button name="connect" onClick={() => onClick()}/>
      )}
    </div>
  )
}

// 
const swapClick = () => {
	console.log('swap')
	console.log(ethersProvider.getSigner().address)
}

const approveClick = async (repay) => {
	console.log('approve')

	// input the contract abi, add in the address
	// add the ability to make a transaction
  // const _contract = new ethers.Contract("0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", ICreditExecutor, ethersProvider.getSigner())
  // newBalance = await _contract.balanceOf(_account)

  let amountToApprove = parseUnits(repay.toString(), 18);

  let daiContract = new ethers.Contract(daiContractAddress, IErc20, ethersProvider.getSigner());
  let res = await daiContract.approve(creditExecutorAddress, amountToApprove)
  console.log(res)
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
  const [account, setAccount ] = useState('')
  const [balance, setBalance ] = useState('')
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet balance={balance} setBalance={setBalance} setAccount={setAccount}/>
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
  const [account, setAccount ] = useState('')
  const [balance, setBalance ] = useState('')

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet balance={balance} setBalance={setBalance} setAccount={setAccount}/>
      {/*wallet*/}

  		{/*swap*/}
      <br />
      	<div className="simple-form">
      	<Input />
  		<Button name={"Approve"} onClick={async () => await approveClick(balance)}/>
      	</div>

  		{/*approve*/}

  		{/*deposit*/}
    </Web3ReactProvider>
  )
}



export {BorrowerAccount}
export default Account

