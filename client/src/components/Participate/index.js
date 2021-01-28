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

const LightButton = (props) => {
	return(<button type="button" className="but" style={{background: "#3c3b3b"}} onClick={props.onClick}>{props.name}</button>)
}

const DarkButton = (props) => {
	return(<button type="button" className="but" onClick={props.onClick}>{props.name}</button>)
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
				<Header title={"rituals"} />

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
					
				</div>
			</React.Fragment>
			)
	}
}

export default Participate;