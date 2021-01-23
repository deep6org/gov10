
import React, {useState } from 'react'
import './index.css'

function Prompt(props){
  
  const [isGo, setGo] = useState(true);
  console.log(props.prompt)
  return(    
   <div className="go-wrapper">
      <div className="about-wrapper">
         {props.message}
      </div>
      <button className="but"
        style={{cursor: 'pointer'}}
        onMouseEnter={() => setGo(false)}
        onMouseLeave={() => setGo(true)}
        // onClick={() => props.setState((props.back == true ? props.state - 1 : props.state + 1))}
      > {isGo ? (props.prompt) : 'x'}</button>
    </div>)
}

export default Prompt;