import React, { useState, useEffect } from "react";
// import script
// import './farmOS-map.js'
// import './mapbox.js'
import './index.css'

import Header from '../Header'
import {Matter} from '../Matter'
// import { LightSpirit, DarkSpirit } from '../Spirit'
import {LightSpirit, DarkSpirit} from '../Spirit'

import {Prompt} from '../Prompt'

import BioSwarm from '../BioSwarm'
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

const LightButton = (props) => {
	return(<button type="button" className="but" style={{background: "#3c3b3b"}} onClick={props.onClick}>{props.name}</button>)
}

const DarkButton = (props) => {
	return(<button type="button" className="but" onClick={props.onClick}>{props.name}</button>)
}

const RevealButton = (props) => {
	return(<button type="button" className="but" style={{width: '200px' }}onClick={props.onClick}>{props.name}</button>)
}

class Participate extends React.Component {

	state = {
		light: true
	}

	componentDidMount(){

	}

	switch = () => {
		this.setState({
			light: !this.state.light
		})
	}

	render(){
		return(
			<React.Fragment>
				<Header title={"ritual"} />

				{
					this.state.light 
						?
					(<div className="light-matter-container">
						<LightSpirit />
					</div>)
					:
					(<div className="dark-matter-container">
						<DarkSpirit />
					</div>)
				}
				<div className="button-wrapper">
				{
					this.state.light 
						?
					(<LightButton onClick={this.switch}/>)
					:
					(<DarkButton onClick={this.switch}/>)
				}
				<br />
				<br />
				<br />
				<div className="reveal-wrapper">
					<RevealButton name={'swarm reveal'}/>
					<br/>
					<br/>
					<br/>
					<div>
						loan health: 102%
					</div>
					<div className="grid">
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
						<div className="spectrum-item">
							gov10:bio
							<img src={"https://i.pinimg.com/originals/56/3d/81/563d81a451d0f08a6da9be76a5604a28.gif"} alt="~" className="thumbnail-spectrum"/>
						</div>
						<li className="land-item">
					      		{'gov10:land'}
					        </li>
					</div>
					<br/>
					<br/>
				</div>
				</div>
			</React.Fragment>
			)
	}
}

export default Participate;