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
import {Container, Row, Col, Modal, Button} from 'react-bootstrap'

import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'


let ethersProvider;
let daiContractAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
let creditExecutorAddress = "0x5e573955221AE2c061C534A20C8F5Ba2A15C23a8";

export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'//kovan
// export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'


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
  const { chainId, account, activate, active } = useWeb3React()

    useEffect(async () => {
      console.log(`use effect -- account: ${account}`)
      console.log(ethersProvider)
      if(ethersProvider){

      const balance = await getTokenBalance(
          'DAI', 
          account, 
          new ethers.Contract("0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", IErc20, ethersProvider.getSigner())
          )
        if(balance != undefined){
          console.log(balance)
          console.log(balance.toString())
          props.setBigbalance(balance)
          props.setBalance(formattedValue(balance, 18))
          props.setAccount(account)
        }
      }else {
        console.log('provider NOT_SET')
      }

    }, [account,active,ethersProvider])

  const onActivateClick = async () => {
      activate(injectedConnector)
  }

  return (
    <div className="simple-form">
      {active ? (
        <>
          <div >account: {account ? account.substring(0,5)+'...' : ''}</div>
          <div >dai balance: {props.balance}</div>
        	<div> ✅ </div>
        </>
      ) : (
        <Button name="connect" style={{marginLeft: '-9px'}} onClick={() => onActivateClick()}>⎈</Button>
      )}
    </div>
  )
}

const swapClick = async (setModal) => {
  setModal(true)
}

const approveClick = async (approve) => {
	console.log('approve')

	// input the contract abi, add in the address
	// add the ability to make a transaction
  // const _contract = new ethers.Contract("0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", ICreditExecutor, ethersProvider.getSigner())
  // newBalance = await _contract.balanceOf(_account)
  console.log(approve)
  let amountToApprove = parseUnits((approve.replace(',','')).toString(), 18);

  let daiContract = new ethers.Contract(daiContractAddress, IErc20, ethersProvider.getSigner());
  let res = await daiContract.approve(creditExecutorAddress, amountToApprove)
  console.log(res)
}

const approveClickDelegator = async (approve) => {
  console.log('approve')

  // input the contract abi, add in the address
  // add the ability to make a transaction
  // const _contract = new ethers.Contract("0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", ICreditExecutor, ethersProvider.getSigner())
  // newBalance = await _contract.balanceOf(_account)
  console.log(approve)
  console.log(approve)
  let amountToApprove;

  if(ethersProvider){

    if(approve == 0){
      amountToApprove = parseUnits((0).toString(), 18);

    }else{
      amountToApprove = parseUnits((approve.toString().replace(',','')).toString(), 18);
    }


    let daiContract = new ethers.Contract(daiContractAddress, IErc20, ethersProvider.getSigner());
    let res = await daiContract.approve(creditExecutorAddress, amountToApprove)
    console.log(res)
  }else{
    console.log('provider_NOT_SET')
  }
}

const depositClick = () => {
	console.log('deposit')
}

const Input = (props) => {
	const [value, setValue] = useState({target: {value: ""}})
	console.log(value.target.value)
  props.setApproval(value)
	return(<input className="input-num" onChange={setValue} />)
}

const Swapper = (props) => {
  const { chainId, account, activate, active } = useWeb3React()
  const [value, setValue] = useState({target: {value: 0}})
  console.log(value.target.value)
  // props.setSwap(value)
  console.log(ethersProvider)  

  const performSwap = async () => {
    const daiFaucetAddress = "0xa94C8CeFD6F9B4a75b13536616871C67a95130b2";
    const daiContractAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";

    console.log('swap')

    // const [owner] = ethersProvider.getSigners().address
    // const [swapper] = ethersProvider.getSigners().address
    console.log(account)

    const params = [{
      from: account,
      to: daiFaucetAddress,
      value: ethers.utils.parseUnits('0.01', 'ether').toHexString()
    }];

    console.log(params)

    const transactionHash = await ethersProvider.send('eth_sendTransaction', params)
    console.log(transactionHash)
    props.setShow(false)
    setTimeout()
  }

  return(
    <>
      <div style={{textAlign: 'center'}}>
      <Container style={{height: '100px', marginTop: '30px'}}>
      <Row>
        <Col>
        <input className="input-num-swap" onChange={setValue} /> <div style={{margin: '6px', marginLeft: "5px"}}>eth</div>
        </Col>
        <Col>
          {"→"}
        </Col>
        <Col>
        {value.target.value * 1300 + ' dai'}
        </Col>
      </Row>
        <button className="but" onClick={performSwap} name="swap">swap</button>
      </Container>
      </div>
    </>
    )
}

function MyButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function renderSwitch(param) {
    switch(param) {
      case 'Swap':
        return (
          <>
          {/*balance*/}
          <Swapper setShow={setShow}/>
          </>);
      case 'Approve':
        return 'Approval';
      default:
        return 'x error x';
    }
  }

  return (
    <>
      <button type="button" disabled={props.disabled} className="but" onClick={handleShow}>{props.name}</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name} to deposit</Modal.Title>
        </Modal.Header>
          {renderSwitch(props.name)}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function MyFlatButton(props) {
  return (
    <>
      <button type="button" disabled={props.disabled} className="but" onClick={async () => {
        await props.click(props.bigbalance)
      }
      }>{props.name}</button>

    </>
  );
}
function MyDelegateButton(props) {
  const history = useHistory();

  return (
    <>
      <button type="button" disabled={props.disabled} className="but" onClick={async () =>history.push("/delegate")
      }>{props.name}</button>

    </>
  );
}

const Account = (props) => {
  const [account, setAccount ] = useState('')
  const [balance, setBalance ] = useState(0)
  const [bigbalance, setBigbalance ] = useState(0)
  const [approved, setApproved ] = useState(false)
  const history = useHistory();

  console.log(props.id)
  console.log(account)
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <p>{'⇪'}</p>
      <Wallet balance={balance} setBigbalance={setBigbalance} setBalance={setBalance} setAccount={setAccount}/>
      {/*wallet*/}

  		{/*swap*/}

  		<MyButton disabled={account == ''} name={"Swap"} onClick={async () => await swapClick(props.setModal)}/>
  		<MyFlatButton disabled={account == ''} name={"Approve"} click={approveClickDelegator} bigbalance={bigbalance}/>
  		<MyDelegateButton disabled={props.id == 0} name={"Deposit"}/>

  		{/*approve*/}

  		{/*deposit*/}
    </Web3ReactProvider>
  )
}

const BorrowerAccount = () => {
  const [approval, setApproval ] = useState(0)
  const [account, setAccount ] = useState('')
  const [balance, setBalance ] = useState(0)
  const [bigbalance, setBigbalance ] = useState(0)


  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet balance={balance} setBigbalance={setBigbalance} setBalance={setBalance} setAccount={setAccount}/>
      {/*wallet*/}

  		{/*swap*/}
      	<div className="simple-form">
      	<Input setApproval={setApproval}/>
        <button type="button" className="but" onClick={async () => await approveClick(balance)}>{"Approve"}</button>
      	</div>

  		{/*approve*/}

  		{/*deposit*/}
    </Web3ReactProvider>
  )
}



export {BorrowerAccount}
export default Account

