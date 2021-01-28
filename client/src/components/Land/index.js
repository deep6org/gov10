import React, { useState, useEffect } from "react";
// import script
// import './farmOS-map.js'
// import './mapbox.js'
import './index.css'

import Header from '../Header'
import {Matter} from '../Matter'
import {Prompt} from '../Prompt'

class Land extends React.Component {


	componentDidMount(){

		// console.log(window.farmOS)
		console.log(' -- loading map for grabs -- ')

		const washingtonLonLat = [-77.036667, 38.895];
		var options = {
	        units: 'metric',
	    //     view: new window.farmOS. View({
			  //   center: washingtonLonLat,
			  //   zoom: 12
			  // })
	      }



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
				<Header title={"whereabouts?"} />
				<Matter count={10} />
				<div className="map-grid">
					<div className='map-container'>
						<div id="map"></div>
					</div>
				</div>
      			<Prompt message={"choose your place, that calls"} prompt={"claim"}/>
			</React.Fragment>
			)
	}
}

export default Land;