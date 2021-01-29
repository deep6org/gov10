import React, { useState, useEffect, useRef, useCallback } from "react";
// import script
// import './farmOS-map.js'
// import './mapbox.js'
import Header from '../Header'
import {MatterBuilder} from '../Matter'
import {Prompt, Accept} from '../Prompt'
import {Land} from '../Land'
import {BorrowerAccount} from '../Account'
import { Canvas, useFrame } from 'react-three-fiber'

import {useDropzone} from 'react-dropzone'

import {Container, Row, Col} from 'react-bootstrap'

function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ( + ) ...</p> : (<>
	          <p>drop: file ( ^ ) or click: for file upload ( + )</p>
	          <p>drop: file ( ^ ) or click: for file upload ( + )</p>
	          <p>drop: file ( ^ ) or click: for file upload ( + )</p>
          </>
          )
      }
    </div>
  )
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'lightblue' : 'lightgrey'} />
    </mesh>
  )
}

class Register extends React.Component {


	componentDidMount(){

	}

  setPayload = (payload) => {
    console.log('calling')
    console.log(payload)
  }

	render(){
		return(
			<React.Fragment>
				<Header title={"your building blocks"} />
				{/* wallet: <MatterBuilder count={9} /> */}

				<div className="matter-container">
				<Canvas>
			      <ambientLight intensity={0.5} />
			      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
			      <pointLight position={[-10, -10, -10]} />
			      <Box position={[0, 0, 0]} />
			    </Canvas>
			    </div>

				{/* wallet */}
				<Container style={{height: '20vh'}}>
					<Row>
				    <Col><BorrowerAccount setPayload={this.setPayload}/></Col>
				    <Col><MyDropzone/></Col>
				    <Col>

						 <div>
						 	<Land/>
						 </div>
				    </Col>
				  </Row>
				</Container>
				{/**/}
      	<Accept message={"ready to borrow funds?"} prompt={"accept"} onClick={this.setPayload} />
			</React.Fragment>
			)
	}
}

export default Register;