
import React, {useState } from 'react'
import './index.css'
import { Link, useHistory } from 'react-router-dom'

function Prompt(props){
  
  const [isGo, setGo] = useState(true);
  const [isBuild, setBuild] = useState(true);
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
        onClick={() => props.setState((props.back == true ? props.state - 1 : props.state + 1))}
      > {isGo ? (props.prompt) : 'x'}</button>
    </div>)
}

function DualPrompt(props){

  const history = useHistory();
  const [isGo, setGo] = useState(true);
  const [isBuild, setBuild] = useState(true);
  return(    
   <div className="go-wrapper">
      <div className="about-wrapper">
         {props.message}
      </div>

      <button className="but"
        style={{cursor: 'pointer'}}
        onMouseEnter={() => setGo(false)}
        onMouseLeave={() => setGo(true)}
        onClick={() => props.setState((props.back == true ? props.state - 1 : props.state + 1))}
      > {isGo ? (props.prompt1) : 'x'}</button>


      <button className="but"
        style={{cursor: 'pointer'}}
        onMouseEnter={() => setBuild(false)}
        onMouseLeave={() => setBuild(true)}
        onClick={() => history.push(props.nextPath)}
        // onClick={() => props.setState((props.back == true ? props.state - 1 : props.state + 1))}
      > {isBuild ? (props.prompt2) : 'x'}</button>
    </div>)
}

export {Prompt, DualPrompt};