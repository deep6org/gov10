import React, { useState, useEffect } from "react";
// import script
// import './farmOS-map.js'
// import './mapbox.js'
import Header from '../Header'
import {MatterBuilder} from '../Matter'
import {Prompt} from '../Prompt'

class Register extends React.Component {


	componentDidMount(){

		// var myMap = window.farmOS.map.create('map', options);
		// // // set to 
		// // myMap.addBehavior("google");
		// myMap.addBehavior("edit");
		// myMap.addBehavior("snappingGrid");
		// myMap.addBehavior("measure", { layer: myMap.edit.layer });
		// myMap.edit.wktOn("featurechange", console.log);
		// myMap.edit.geoJSONOn("featurechange", console.log);

		// // Adding a GeoJSON layer from object.
		// const geoJsonObjectOpts = {
		//   title: 'geojson', // defaults to 'geojson'
		//   geojson: {
		//     type: 'Polygon',
		//     coordinates: [
		//       [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
		//     ]
		//   }, // REQUIRED! (either this or `url`)
		//   color: 'orange', // defaults to 'orange'
		//   visible: true, // defaults to true
		// }

		//  myMap.addLayer('geojson', geoJsonObjectOpts);

	}


	render(){
		return(
			<React.Fragment>
				<Header title={"your building blocks"} />
				<MatterBuilder count={9} />
				{/* wallet */}
				{/**/}
      			<Prompt message={"ready to borrow funds?"} prompt={"accept"}/>
			</React.Fragment>
			)
	}
}

export default Register;