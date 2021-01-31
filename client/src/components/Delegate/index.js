import React, { useState, useEffect, createRef, useContext } from "react";
import { useScreenshot, createFileName } from 'use-react-screenshot'
import GlobalState from '../../contexts/GlobalState';
import './index.css';

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

function Delegate(){

	  const [state, setState] = useContext(GlobalState);

	  useEffect(() => {
	    setState(state => ({...state, borrowerAddress: "dsfsdfsdfsdf", loanAmount: 1000, period: 1}))
	  }, []);


	const ref = createRef(null)
	const [image, takeScreenshot] = useScreenshot()
	const getImage = () => takeScreenshot(ref.current)

  const [modal, setModal] = useState(false)
  const [amount, setAmount] = useState(0)
  const [id, setId] = useState(0)
  const [check, setCheck] = useState(false)

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

  const delegate = () => {
  	console.log('delegate')
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
         {id != 0 ? <img src={placements[0]} className="thumb-nail"/> : ''}
        </li>
      </ul>

      	<div>
      	{amount !=0 ? `delegate: ${amount}` : ''}
      	<br />
      	<p className="loan-agreement">deposit a loan to &nbsp;<b>{state.borrowerAddress}&nbsp;</b> for <b>{state.loanAmount}</b> dai, repayed in <b>{state.period}</b> year(s)</p>
		<p>
		<input type="radio" checked={check} style={{margin: '10px'}} onClick={()=>setCheck(!check)}/>
			option for spectrum demand note?
		</p>
      
      {check ? 
      		(<>
      			<input style={{marginBottom: '10px'}} placeholder="pool key"></input>
      		</>) : "" }
      <br />
      <button className="but" name="delegate" onClick={delegate}>delegate</button>
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