import React, { useState, useEffect } from "react";
//import { Space, Row, Col, Radio, Card, Select, Statistic, Descriptions, Typography, Button, Divider, Drawer, Table, Skeleton } from "antd";
//import { Percent } from '@uniswap/sdk'
//import { parseUnits, formatUnits, formatEther } from "@ethersproject/units";
//import { ethers } from "ethers";
//import { useBlockNumber, usePoller } from "eth-hooks";
import { abi as IAddressProvider } from './abis/LendingPoolAddressProvider.json'
import { abi as IDataProvider } from './abis/ProtocolDataProvider.json'
import { abi as ILendingPool } from './abis/LendingPool.json'
import { abi as IPriceOracle } from './abis/PriceOracle.json'

import {Container, Row, Col, Modal, Button} from 'react-bootstrap'

// import Swap from "../Swap/index"
import { ethers } from "ethers";

import { APIClient, Openlaw } from 'openlaw';
import OpenLawForm from 'openlaw-elements';
// our optional base styles - feel free to use them!
import 'openlaw-elements/dist/openlaw-elements.min.css';

import Account from '../Account/'

import './index.css'

import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { parseUnits, formatUnits, formatEther } from "@ethersproject/units";

export const POOL_ADDRESSES_PROVIDER_ADDRESS = '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5'
const PROTOCOL_DATA_PROVIDER = '0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d'
const LENDING_POOL = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9'
const PRICE_ORACLE = '0xa50ba011c48153de246e5192c8f9258a2ba79ca9'


// // OpenLaw APIClient: https://docs.openlaw.io/api-client/#authentication
// //  - used to fetch geo data in our `Address` field type
// //  - to run against your own private OpenLaw instance: 'https://[YOUR.INSTANCE.URL]';
// const apiClient = new APIClient('https://lib.openlaw.io/api/v1/default');
// // You can login from a Node server (e.g. Express), and be sure to pass the `OPENLAW_JWT`  on to the client.
// // If you require your users to have an account on your instance, create a login page on the client.
// apiClient.login('@gmail.com', 'p');

// // https://docs.openlaw.io/openlaw-object/#compiletemplate
// const { compiledTemplate } = Openlaw.compileTemplate('**Name**: [[First Name]] [[Last Name]]');
// // https://docs.openlaw.io/openlaw-object/#execute
// // https://docs.openlaw.io/openlaw-object/#getexecutedvariables
// // typically the parameters object will be updated in state via 
// // an `onChangeFunction` handler (or in a state manager like Redux
// // or MobX) throughout the lifetime of the app
// const parameters = {};

// const { executionResult, errorMessage } = Openlaw.execute(compiledTemplate, {}, parameters, {});
// const variables = Openlaw.getExecutedVariables(executionResult, {});

// // helpful for logging in development, or throwing exceptions at runtime
// if (errorMessage) {
// console.error('Openlaw Execution Error:', errorMessage);
// }

// const onChange = (key, value) => {
// console.log('KEY:', key, 'VALUE:', value);
// parameters[key] = value

// console.log(variables)
// console.log(executionResult)
// }

// const onSign = () => {
// console.log('signing')

// }

// <OpenLawForm
//   // https://docs.openlaw.io/openlaw-elements/#required-parameters
//   apiClient={apiClient}
//   executionResult={executionResult}
//   parameters={parameters}
//   onChangeFunction={onChange}
//   openLaw={Openlaw}
//   variables={variables}
// />

function Balance (props){
  return(<div className="balance">{props.ticker} :: {props.amount}</div>)

}

function BalanceBar(props){
  const balances = props.balances.map((k) => {
    return <Balance ticker={k.ticker} amount={k.amount} />
  })
  return(<div className="">{balances}</div>)

}

function Panel(){
  return(<div></div>)
}

function Action(){
  return(<div></div>)
}

// function Swap(){
  
        // <BalanceBar balances={[{ticker: 'eth', amount: 1.3},{ticker: 'dai', amount: 20},{ticker: 'usdc', amount: 120},]} />
// } 
// var level = require('level')
// var db = level('my-db')

// var hypercore = require('hypercore')
// var ram = require('random-access-memory')
// var feed = hypercore(ram, {valueEncoding: 'utf-8'})

// const Hyperbee = require('hyperbee')
// const db = new Hyperbee(feed, {
//   keyEncoding: 'utf-8', // can be set to undefined (binary), utf-8, ascii or and abstract-encoding
//   valueEncoding: 'binary' // same options as above
// })

function DebtList(props){

  const [fetched, setfetched] = useState(false)
  const [debts, setDebts] = useState([])

  // db.createReadStream({ keys: true, values: false })
  // .on('data', function (data) {
  //   console.log('key=', data)
  //   debts.push(data)
  // })

  useEffect( () => {

    async function fetchProposals() {
      try {
          const response = await axios.get("http://localhost:3001/list");
          console.log(response.data);
          response.data.forEach((debt) => {
            // debts.push(debt)
            console.log(debt)
            setDebts(response.data)
          })
          setfetched(true)
      } catch (err) {
          console.error(err);
      }

    }

    !fetched && fetchProposals()

    // feed.append('hello')
    // feed.append('world', function (err) {
    //   if (err) throw err
    //   feed.get(0, console.log) // prints hello
    //   feed.get(1, console.log) // prints world
    // })

    // console.log('calling USE_EFFECT')

    //   setTimeout(async () => {
    //     console.log('calling setTimeout')
    //     const data = {
    //       term: 5,
    //       amount: 10000
    //     }
    //     await db.put('foo', data)

    //   }, 2000)
  }, [])



  const debtList = debts.map((d, k) => {
    console.log('DEBT')
    return <Debt setId={props.setId}i={++k} {...d}/>
  })

  return (
    <div className="debt">
      <Row>
        <Col>
          {`id`}
        </Col>
        <Col>
          {'debt'}
        </Col>
        <Col>
          {'repayment'}
        </Col>
        <Col>
          {'decision'}
        </Col>
      </Row>
      <br/>

      {debtList}
    </div>)
}

function Debt(props) {
  const clicked = (id) => {
    console.log("go")
    console.log(id)
    props.setId(id)
  }

  return (
    <div>
      <Row>
        <Col>
          {`# ${props.i}`}
        </Col>
        <Col>
          {props.debt}
        </Col>
        <Col>
          {props.repayment}
        </Col>
        <Col>
          <div onClick={() => props.setId(props.i)} style={{cursor: 'crosshair', fontSize: '20px'}}>{"»"}</div>
        </Col>
      </Row>
     
    </div>
    )
}

const placements = {
  0:"https://globalnews.ca/wp-content/uploads/2019/12/orbit-pic-3-1024x576.jpg?quality=85&strip=all",
  1:"https://globalnews.ca/wp-content/uploads/2019/12/orbit-pic-3-1024x576.jpg?quality=85&strip=all",
  2:"https://i.pinimg.com/564x/ed/09/47/ed09478d4cb05ef11e9050b013744a90.jpg",
  3:"https://i.pinimg.com/564x/9a/c2/b1/9ac2b14e9cf1f8f69211a77b003a650e.jpg",
  4:"",
  5:"",
  6:"",
  7:"",
  8:"",
  9:""
}

function Lend({ selectedProvider, ethPrice }){

  const [modal, setModal] = useState(false)
  const [amount, setAmount] = useState(0)
  const [id, setId] = useState(0)
  // let provider = ethers.getDefaultProvider('kovan');

  return (
    <div className="lend">
      <ul className="grid">
        <li className="land-item">
          lend funds
         {id != 0 ? <img src={placements[id]} className="thumb-nail"/> : ''}
        </li>
      </ul>

      <div>
        <Panel/>
      </div>
      {amount !=0 ? `delegate: ${amount}` : ''}
      <br />

      {/* <Swap selectedProvider={provider}/> */}
      <Account id={id} setModal={setModal} />
      <br/>
      <br/>
      <DebtList setId={setId}/>
    </div>
  )
}



export default Lend;


/*
  function Lend({ selectedProvider, ethPrice }) {

  const [settingsVisible, setSettingsVisible] = useState(false)

  const [userConfiguration, setUserConfiguration] = useState()
  const [userAccountData, setUserAccountData] = useState()
  const [userAssetData, setUserAssetData] = useState({})
  const [userAssetList, setUserAssetList] = useState({})

  const [reserveTokens, setReserveTokens] = useState()
  const [assetData, setAssetData] = useState({})
  const [assetPrices, setAssetPrices] = useState({})

  const [liveAsset, setLiveAsset] = useState("none")

  const [showActiveAssets, setShowActiveAssets] = useState(false)

  const [displayCurrency, setDisplayCurrency] = useState('native')

  let signer = selectedProvider.getSigner()
  let addressProviderContract = new ethers.Contract(POOL_ADDRESSES_PROVIDER_ADDRESS, IAddressProvider, signer);
  let dataProviderContract = new ethers.Contract(PROTOCOL_DATA_PROVIDER, IDataProvider, signer);
  let lendingPoolContract = new ethers.Contract(LENDING_POOL, ILendingPool, signer);
  let priceOracleContract = new ethers.Contract(PRICE_ORACLE, IPriceOracle, signer);

  const getReserveData = async () => {
    if(reserveTokens) {
      console.log('getting reserve data')
      reserveTokens.forEach(async (asset) => {
        if(["none",asset.symbol].includes(liveAsset)) {
        let _reserveData = await dataProviderContract.getReserveData(asset.tokenAddress)
        let _reserveConfigurationData = await dataProviderContract.getReserveConfigurationData(asset.tokenAddress)
        let _newAssetData = {}
        _newAssetData[asset.symbol] = {...asset, ..._reserveData, ..._reserveConfigurationData}
        setAssetData(assetData => {
          return {...assetData, ..._newAssetData}})
          }
      })
    }
  }


  useEffect(() => {
    getReserveData()
    getPriceData()
  }, [reserveTokens])


  const getPriceData = async () => {
    if(reserveTokens && liveAsset==="none") {
      console.log('getting price data')
      let assetAddresses = reserveTokens.map(a => a.tokenAddress)
      let prices = await priceOracleContract.getAssetsPrices(assetAddresses)
      console.log(prices)
      let _assetPrices = {}
      for (let i = 0; i < prices.length; i++) {
        let _symbol = reserveTokens[i]['symbol']
        _assetPrices[_symbol] = prices[i]
      }
      setAssetPrices(_assetPrices)
    }
  }

  const checkUserConfiguration = async (_configuration) => {
    if(_configuration && reserveTokens) {
      let _userActiveAssets = {}
      let configBits = parseInt(userConfiguration.toString(), 10).toString(2)
      let reversedBits = configBits.split("").reverse()
      let _userAssetList = {}
      for (let i = 0; i < reversedBits.length; i++) {
        let _assetIndex = Math.floor(i/2)
        if(reversedBits[i]==="1") {
          let _type = i%2===0?"debt":"collateral"
          let _symbol = reserveTokens[_assetIndex]['symbol']
          let _newAsset
          if(_userAssetList[_symbol]){
            _newAsset = [..._userAssetList[_symbol], _type]
          } else { _newAsset = [_type]}
          _userAssetList[_symbol] = _newAsset
        }
      }
      setUserAssetList(_userAssetList)
    }
  }

  useEffect(() => {
    checkUserConfiguration(userConfiguration)
  }, [userConfiguration])

  const getUserAssetData = async () => {
    if(userAssetList && reserveTokens) {
      let address = await signer.getAddress()

      Object.keys(userAssetList).forEach(async (asset) => {

        var _assetInfo = reserveTokens.filter(function (el) {
          return el.symbol === asset})

        console.log(asset, _assetInfo)

        let _asset = {}
        let _data
        _data = await dataProviderContract.getUserReserveData(_assetInfo[0].tokenAddress,address)
        _asset[asset] = _data

        setUserAssetData(userAssetData => {
          return {...userAssetData, ..._asset}})

      })
      }
    }

  useEffect(() => {
    getUserAssetData()
  },[userAssetList])

  const getLendingPoolContract = async () => {
    let lendingPoolAddress = await addressProviderContract.getLendingPool()//makeCall('getAddress', addressProviderContract, ["0x1"])
    console.log(lendingPoolAddress)
    return new ethers.Contract(lendingPoolAddress, ILendingPool, signer);
  }

  const getUserInfo = async () => {
    console.log('getting user info')
    let address = await signer.getAddress()
    let _accountData = await lendingPoolContract.getUserAccountData(address)
    setUserAccountData(_accountData)
    let _userConfiguration = await lendingPoolContract.getUserConfiguration(address)
    setUserConfiguration(_userConfiguration)
  }

  const getReserveTokens = async () => {
    if(!reserveTokens && dataProviderContract && selectedProvider) {
      console.log('getting Reserve Tokens')
      let _reserveTokens = await dataProviderContract.getAllReservesTokens()//.getReserveData("0x6B175474E89094C44Da98b954EedeAC495271d0F")//makeCall('getAddress', addressProviderContract, ["0x1"])
      console.log(_reserveTokens)
      setReserveTokens(_reserveTokens)
    }
  }

  usePoller(getReserveTokens, 3000)
  usePoller(getReserveData, 15000)
  usePoller(getPriceData, 25000)
  usePoller(getUserInfo, 6000)

  usePoller(()=>{console.log(assetData)} , 6000)

  let convertNative = ['USD','ETH'].includes(displayCurrency)
  let showUsdPrice = (ethPrice && displayCurrency === 'USD')

  const convertValue = (_amountInUnits, _decimals, _toEthMultiplier) => {
    let decimals = _decimals ? _decimals : 18
    let toEthMultiplier = _toEthMultiplier ? _toEthMultiplier : 1
    return (parseFloat(formatUnits(_amountInUnits,decimals)) * toEthMultiplier * (showUsdPrice ? ethPrice : 1))
  }

  const formattedValue = (_amountInUnits, _decimals, _toEthMultiplier) => {
    return convertValue(_amountInUnits, _decimals, _toEthMultiplier).toLocaleString()
  }

  const columns = [
  {
    title: 'Name',
    dataIndex: 'symbol',
    key: 'symbol',
    fixed: 'left',
    sorter: (a, b) => a.symbol.localeCompare(b.symbol),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Market size' + (convertNative?` (${displayCurrency})`:''),
    key: 'marketSize',
    render: value => formattedValue(value.availableLiquidity.add(value.totalStableDebt).add(value.totalVariableDebt), value.decimals, (assetPrices[value.symbol]&&convertNative)?formatEther(assetPrices[value.symbol]):1),
    sorter: (a, b) => convertValue(a.availableLiquidity.add(a.totalStableDebt).add(a.totalVariableDebt), a.decimals, (assetPrices[a.symbol]&&convertNative)?formatEther(assetPrices[a.symbol]):1) - convertValue(b.availableLiquidity.add(b.totalStableDebt).add(b.totalVariableDebt), b.decimals, (assetPrices[b.symbol]&&convertNative)?formatEther(assetPrices[b.symbol]):1),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Liquidity' + (convertNative?` (${displayCurrency})`:''),
    key: 'availableLiquidity',
    render: value => formattedValue(value.availableLiquidity, value.decimals, (assetPrices[value.symbol]&&convertNative)?formatEther(assetPrices[value.symbol]):1),
    sorter: (a, b) => convertValue(a.availableLiquidity, a.decimals, (assetPrices[a.symbol]&&convertNative)?formatEther(assetPrices[a.symbol]):1) - convertValue(b.availableLiquidity, b.decimals, (assetPrices[b.symbol]&&convertNative)?formatEther(assetPrices[b.symbol]):1),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Deposit rate',
    key: 'depositRate',
    render: value => parseFloat(formatUnits(value.liquidityRate, 25)).toFixed(2) + "%",
    sorter: (a,b) => parseFloat(formatUnits(a.liquidityRate, 25)) - parseFloat(formatUnits(b.liquidityRate, 25)),
    sortDirections:['descend', 'ascend']
  },
  {
    title: 'Variable rate',
    key: 'variableRate',
    render: value => parseFloat(formatUnits(value.variableBorrowRate, 25)).toFixed(2) + "%",
    sorter: (a,b) => parseFloat(formatUnits(a.variableBorrowRate, 25)) - parseFloat(formatUnits(b.variableBorrowRate, 25)),
    sortDirections:['descend', 'ascend']
  },
  {
    title: 'Stable rate',
    key: 'stableRate',
    render: value => parseFloat(formatUnits(value.stableBorrowRate, 25)).toFixed(2) + "%",
    sorter: (a,b) => parseFloat(formatUnits(a.stableBorrowRate, 25)) - parseFloat(formatUnits(b.stableBorrowRate, 25)),
    sortDirections:['descend', 'ascend']
  },
  {
    title: 'Deposited' + (convertNative?` (${displayCurrency})`:''),
    key: 'deposited',
    render: value => (userAssetData[value.symbol] && userAssetData[value.symbol]['currentATokenBalance'])&&formattedValue(userAssetData[value.symbol]['currentATokenBalance'], value.decimals, (assetPrices[value.symbol]&&convertNative)?formatEther(assetPrices[value.symbol]):1),
  },
  {
    title: 'Stable Debt' + (convertNative?` (${displayCurrency})`:''),
    key: 'stableDebt',
    render: value => (userAssetData[value.symbol] && userAssetData[value.symbol]['currentStableDebt'])&&formattedValue(userAssetData[value.symbol]['currentStableDebt'], value.decimals, (assetPrices[value.symbol]&&convertNative)?formatEther(assetPrices[value.symbol]):1),
  },
  {
    title: 'Variable Debt' + (convertNative?` (${displayCurrency})`:''),
    key: 'variableDebt',
    render: value => (userAssetData[value.symbol])&&formattedValue(userAssetData[value.symbol]['currentVariableDebt'], value.decimals, (assetPrices[value.symbol]&&convertNative)?formatEther(assetPrices[value.symbol]):1),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: value => {
      return (<div>
      {value.isActive&&<AaveAction setLiveAsset={setLiveAsset} type="deposit" assetData={value} assetPrice={assetPrices[value.symbol]} signer={signer} lendingPoolContract={lendingPoolContract} userAccountData={userAccountData} userAssetData={userAssetData[value.symbol]}/>}
      {(Object.keys(userAssetList).filter(asset => userAssetList[asset].includes('collateral')).includes(value.symbol)&&(
        <AaveAction setLiveAsset={setLiveAsset} type="withdraw" assetData={value} assetPrice={assetPrices[value.symbol]} signer={signer} lendingPoolContract={lendingPoolContract} userAccountData={userAccountData} userAssetData={userAssetData[value.symbol]}/>
      ))}
      {(value.borrowingEnabled&&userAccountData&&userAccountData.availableBorrowsETH>0)&&<AaveAction setLiveAsset={setLiveAsset} type="borrow" assetData={value} assetPrice={assetPrices[value.symbol]} signer={signer} lendingPoolContract={lendingPoolContract} userAccountData={userAccountData} userAssetData={userAssetData[value.symbol]}/>}
      {(Object.keys(userAssetList).filter(asset => userAssetList[asset].includes('debt')).includes(value.symbol)&&(
        <AaveAction setLiveAsset={setLiveAsset} type="repay" assetData={value} assetPrice={assetPrices[value.symbol]} signer={signer} lendingPoolContract={lendingPoolContract} userAccountData={userAccountData} userAssetData={userAssetData[value.symbol]}/>
      ))}
      </div>)
    }
  },
];

  let userAccountDisplay
  if(userAccountData) {
    userAccountDisplay = (
      <>
      <Row gutter={16} justify="center" align="middle">
      <Col span={8}>
        <Statistic title={"collateral"} value={formattedValue(userAccountData.totalCollateralETH)} suffix={showUsdPrice ? "USD" : "ETH"}/>
      </Col>
      <Col span={8}>
        <Statistic title={"debt"} value={formattedValue(userAccountData.totalDebtETH)} suffix={showUsdPrice ? "USD" : "ETH"}/>
      </Col>
      <Col span={8}>
        <Statistic title={"allowance"} value={formattedValue(userAccountData.availableBorrowsETH)} suffix={showUsdPrice ? "USD" : "ETH"}/>
      </Col>
      </Row>
      <Drawer visible={settingsVisible} onClose={() => { setSettingsVisible(false) }} width={500}>
      <Descriptions title="Account Details" column={1} style={{textAlign: 'left'}}>
        <Descriptions.Item label={"currentLiquidationThreshold"}>{new Percent(userAccountData.currentLiquidationThreshold.toString(), "10000").toFixed(2)}</Descriptions.Item>
        <Descriptions.Item label={"ltv"}>{new Percent(userAccountData.ltv.toString(), "10000").toFixed(2)}</Descriptions.Item>
        <Descriptions.Item label={"healthFactor"}>{parseFloat(formatUnits(userAccountData.healthFactor,18)).toFixed(3)}</Descriptions.Item>
        {userConfiguration&&<Descriptions.Item label={`Account configuration`}>{parseInt(userConfiguration.toString(), 10).toString(2)}</Descriptions.Item>}
        <Descriptions.Item label={"activeAssets"}>{Object.keys(userAssetList).join(',')}</Descriptions.Item>
      </Descriptions>
      </Drawer>
      </>
  )
} else {
  userAccountDisplay = (<Skeleton active/>)
}

  let missingPrices = reserveTokens && Object.keys(assetPrices).length < reserveTokens.length

  return (
    <Card title={<Space><img src="https://ipfs.io/ipfs/QmWzL3TSmkMhbqGBEwyeFyWVvLmEo3F44HBMFnmTUiTfp1" width='40' alt='aaveLogo'/><Typography>Aave Lender</Typography></Space>}
      extra={
        <Space>
        <Radio.Group
          options={['native','ETH','USD']}
          onChange={(e)=>{setDisplayCurrency(e.target.value)}}
          value={displayCurrency}
          optionType="button"
          buttonStyle="solid"
          disabled={missingPrices}
        />
        <Radio.Group
          options={[
            { label: 'All', value: false },
            { label: 'Active', value: true }]}
          onChange={(e)=>{
            setShowActiveAssets(e.target.value)
          }}
          value={showActiveAssets}
          optionType="button"
          buttonStyle="solid"
        />
        <Button type="text" onClick={() => {setSettingsVisible(true)}}><SettingOutlined /></Button>
        </Space>}
      style={{ textAlign: 'left' }}
        >
    {userAccountDisplay}
    <Divider/>
    <Table dataSource={Object.values(assetData).filter(asset => (showActiveAssets&&userAssetList)?Object.keys(userAssetList).includes(asset.symbol):true)} columns={columns} pagination={false} scroll={{ x: 1300 }}/>
    </Card>
  )

}
*/