import React, { useState, useEffect, createRef, useContext } from "react";
import { useScreenshot, createFileName } from 'use-react-screenshot'
import GlobalState from '../../contexts/GlobalState';
import './index.css';

import BioSwarm from '../BioSwarm';

import { Canvas, useFrame } from 'react-three-fiber'

const factions = {
  0:{
    selected: false,
    id: 'mer',
    units: 100,
    aura: 'grey'
  },
  1:{
    selected: false,

    id: 'ven',
    units: 100,
    aura: 'pink'
  },
  2:{
    selected: false,

    id: 'ear',
    units: 100,
    aura: 'green'
  },
  3:{
    selected: false,

    id: 'mar',
    units: 100,
    aura: 'red'
  },
  4:{
    selected: false,

    id: 'jup',
    units: 100,
    aura: 'orange'
  },
  5:{
    selected: false,

    id: 'sat',
    units: 100,
    aura: 'yellow'
  },
  6:{
    selected: false,

    id: 'ura',
    units: 100,
    aura: 'aqua'
  },
  7:{
    selected: false,

    id: 'nep',
    units: 100,
    aura: 'blue'
  },
  8:{
    selected: false,

    id: 'plu',
    units: 100,
    aura: 'purple'
  }
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
const address = "0x30f072190a44714C43D3eBC2f67566C617287BfE"

function Delegate(){
  
	  const [state, setState] = useContext(GlobalState);

	  useEffect(() => {
	    setState(state => ({...state, borrowerAddress: address.substring(0,5)+ "..." + address.substring(address.length - 4, address.length -1), loanAmount: 1000, period: 1}))
	  }, []);


	const ref = createRef(null)
	const [image, takeScreenshot] = useScreenshot()
	const getImage = () => takeScreenshot(ref.current)

  const [modal, setModal] = useState(false)
  const [amount, setAmount] = useState(0)
  const [id, setId] = useState(0)
  const [check, setCheck] = useState(false)
  const [key, setKey] = useState('')

  const download = (image, { name = "img", extension = "png" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  useEffect(() => {
    if (image) {
      download(image, { name: "my-gov10-note.ino", extension: "png" });
    }
  }, [image]);

  const delegate = (key) => {
  	console.log('delegate')
    console.log(key)
    // get key, sign message
    // call contract to deposit and issue
  }

  // let provider = ethers.getDefaultProvider('kovan');

  return (
    <div className="lend" ref={ref}>
    	<p>001 
    		{check ? 
      		(<>
      			 {" ~  "}
      		</>) : " +  " }

      			jep</p>
      <ul className="grid">
        <li className="land-item">
         	you
      		{'*'}
          <Canvas
                      shadowMap
                      width={200}
                      height={200}
                      gl={{ alpha: true, antialias: false }}
                      camera={{ fov: 75, position: [0, 0, 70], near: 10, far: 150 }}
                      style={{margin: '10px'}}
                      >
                    <BioSwarm 
                        count={20} 
                        factored={3}
                        color={factions[3].aura}
                    />
                    <ambientLight intensity={1.5} />
                    <pointLight position={[100, 100, 100]} intensity={2} castShadow />
                  </Canvas>
        </li>
        <li className="spectrum-item">
        	{check ? 
      		(<>
      			~
        		<img src={"https://i.pinimg.com/originals/56/3d/81/563d81a451d0f08a6da9be76a5604a28.gif"} alt="~" className="thumbnail-spectrum"/>
        
      		</>) : "+" }

        	</li>
        <li className="land-item">
          lend funds
         {<img src={placements[0]} className="thumb-nail"/> }
        </li>
      </ul>

      	<div>
      	{amount !=0 ? `delegate: ${amount}` : ''}
      	<br />
      	<p className="loan-agreement">deposit a loan to &nbsp;<b>{state.borrowerAddress}&nbsp;</b> for <b>{state.loanAmount}</b> dai, repayed in <b>{state.period}</b> year(s)</p>
		<p>
		<input type="radio" checked={check} style={{margin: '10px'}} onClick={()=>setCheck(!check)}/>
			option for <b>30 day</b> spectrum demand note?
		</p>
      
      {check ? 
      		(<>
      			<input className="pool-key" placeholder="pool key" onChange={(e) => setKey(e.target.value)}></input>
      		</>) : "" }
      <br />
      <button className="but" name="delegate" onClick={() => delegate(key)}>delegate</button>
      <br />
      <br />
      <br />
      <br />
      <p style={{cursor: 'crosshair'}}onClick={getImage}>screenshot this page</p>

      {/* <Swap selectedProvider={provider}/> */}
      <br/>
      <br/>
    	</div>
    </div>
  )
}

export default Delegate;