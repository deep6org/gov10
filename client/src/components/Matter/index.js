import React, { useRef, useMemo, useState, useEffect } from 'react'

import Effects from './Effects'

import * as THREE from 'three'
import { Canvas, useFrame } from 'react-three-fiber'

import niceColors from 'nice-color-palettes'
import './index.css'

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const colors = new Array(1000).fill().map(() => niceColors[19][Math.floor(Math.random() * 5)])

function Boxes(props) {
  const [hovered, set] = useState()
  const colorArray = useMemo(() => Float32Array.from(new Array(20).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), [])

  const ref = useRef()
  const previous = useRef()
  useEffect(() => void (previous.current = hovered), [hovered])

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(time / 4)
    ref.current.rotation.y = Math.sin(time / 2)
    let i = 0
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++
          tempObject.position.set(5 - x, 5 - y, 5 - z)
          tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
          tempObject.rotation.z = tempObject.rotation.y * 2
          if (hovered !== previous.current) {
            // get details of loan here
            // props.setLand(hovered)
            tempColor.set(id === hovered ? 'orange' : colors[id]).toArray(colorArray, id * 3)
            ref.current.geometry.attributes.color.needsUpdate = true
          }
          const scale = id === hovered ? 2 : 1
          tempObject.scale.set(scale, scale, scale)
          tempObject.updateMatrix()
          ref.current.setMatrixAt(id, tempObject.matrix)
        }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, props.count]} onPointerMove={e => set(e.instanceId)} onPointerOut={e => set(undefined)}>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
      </boxBufferGeometry>
      <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

function BuilderBoxes(props) {
  const [hovered, set] = useState()
  const colorArray = useMemo(() => Float32Array.from(new Array(20).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), [])

  const ref = useRef()
  const previous = useRef()
  useEffect(() => void (previous.current = hovered), [hovered])

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(time / 4)
    ref.current.rotation.y = Math.sin(time / 2)
    let i = 0
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++)
        for (let z = 0; z < 3; z++) {
          const id = i++
          tempObject.position.set(5 - x, 5 - y, 5 - z)
          tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
          tempObject.rotation.z = tempObject.rotation.y * 1
          if (hovered !== previous.current) {
            // get details of loan here
            // props.setLand(hovered)
            tempColor.set(id === hovered ? 'orange' : colors[id]).toArray(colorArray, id * 3)
            ref.current.geometry.attributes.color.needsUpdate = true
          }
          const scale = id === hovered ? 2 : 1
          tempObject.scale.set(scale, scale, scale)
          tempObject.updateMatrix()
          ref.current.setMatrixAt(id, tempObject.matrix)
        }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, props.count]} onPointerMove={e => set(e.instanceId)} onPointerOut={e => set(undefined)}>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
      </boxBufferGeometry>
      <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

function Matter(props) {
  // here we understand 
  return(
    <div className="matter-container">
      <Canvas
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 15], near: 5, far: 20 }}
        onCreated={(state) => state.gl.setClearColor('#f0f0f0')}
      >
        
        <ambientLight />
        <pointLight position={[150, 150, 150]} intensity={0.55} />
        <Boxes setLand={props.setLand} count={20} height={'100px'} />
        <Effects />
      </Canvas>

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
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function MatterBuilder(props) {
  // here we understand 
  return(
    <div className="matter-container">
      <Canvas
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 5], near: 5, far: 30 }}
        onCreated={(state) => state.gl.setClearColor('#f0f0f0')}
      >
        
        <ambientLight />
        <pointLight position={[150, 150, 150]} intensity={0.55} />
        <BuilderBoxes setLand={props.setLand} count={9} height={'100px'} />

      </Canvas>

    </div>
  )
}

export {Matter};
export {MatterBuilder};