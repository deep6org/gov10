import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom'
import React, { useRef, useMemo, useState, useEffect } from 'react'

import * as THREE from 'three'
import { Canvas, useFrame } from 'react-three-fiber'

import niceColors from 'nice-color-palettes'

import Effects from './Effects'
import { EffectComposer, SSAO } from 'react-postprocessing'

import { Link, useHistory } from 'react-router-dom'

// import './styles.css'

// https://codesandbox.io/embed/r3f-gamma-correction-kmb9i

function click () {
  console.log('click')
}

function Swarm({ count, mouse, color, factored}) {
  const mesh = useRef()
  const [dummy] = useState(() => new THREE.Object3D())

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100

      const factor = 20 * factored + Math.random() * 100

      const speed = 0.01 + Math.random() / 200
      const xFactor = -20 + Math.random() * 40
      const yFactor = -20 + Math.random() * 40
      const zFactor = -20 + Math.random() * 40
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.max(1.5, Math.cos(t) * 5)
      particle.mx += (state.mouse.x * state.viewport.width - particle.mx) * 0.02
      particle.my += (state.mouse.y * state.viewport.height - particle.my) * 0.02
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]} castShadow receiveShadow>
        <sphereBufferGeometry args={[factored, 32, 32]} />
        <meshPhongMaterial color={color}/>
      </instancedMesh>
    </>
  )
}

// function App() {
  // return (
    
  // )
// }


let loanId = 0;

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const colors = new Array(1000).fill().map(() => niceColors[19][Math.floor(Math.random() * 5)])

function Boxes(props) {
  const [hovered, set] = useState()
  const colorArray = useMemo(() => Float32Array.from(new Array(1000).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())), [])

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
    <instancedMesh ref={ref} args={[null, null, 1000]} onPointerMove={e => set(e.instanceId)} onPointerOut={e => set(undefined)}>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
      </boxBufferGeometry>
      <meshPhongMaterial attach="material" vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

// ReactDOM.render(
//   <Canvas
//     gl={{ antialias: false, alpha: false }}
//     camera={{ position: [0, 0, 15], near: 5, far: 20 }}
//     onCreated={({ gl }) => gl.setClearColor('lightpink')}>
//     <ambientLight />
//     <pointLight position={[150, 150, 150]} intensity={0.55} />
//     <Boxes />
//     <Effects />
//   </Canvas>,
//   document.getElementById('root')
// )

const UI_STATES = Object.freeze({
  MATTER   :1,
  BIO      :2,
  LEND     :3
})


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

function someHandler (i) {
  console.log(i)
}

        // onCreated={({ gl }) => gl.setClearColor('lightpink')}>

function Matter(props) {
  // here we understand 
  return(
    <div className="container">
      <Canvas
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 15], near: 5, far: 20 }}
      >
        <color attach="background" />
        <ambientLight />
        <pointLight position={[150, 150, 150]} intensity={0.55} />
        <Boxes setLand={props.setLand} height={'300px'} />
        <Effects />
      </Canvas>

    </div>
  )
}

function setSelect(k){
  factions[k].selected = true;
  console.log(factions[k])
}

function BioPool(){

     const [isPool, setPool] = useState(0);
     console.log(isPool)
  // here we see and choose
    const tiles = [...Array(9).keys()].map(k => {

        return <li 
                  className="grid-item"
                  onClick={() => setSelect(k)}
                  onMouseEnter={() => someHandler(k)} 
               >
           <Canvas
            shadowMap
            width={200}
            height={200}
            gl={{ alpha: false, antialias: false }}
            camera={{ fov: 75, position: [0, 0, 70], near: 10, far: 150 }}
            onCreated={(state) => state.gl.setClearColor('white')}
            style={{margin: '10px'}}
            
            >
            <ambientLight intensity={1.5} />
            <pointLight position={[100, 100, 100]} intensity={2} castShadow />
            <pointLight position={[-100, -100, -100]} intensity={50} color="red" />
            <Swarm 
            factored={0.8}
            count={100} 
            color={factions[k].aura}
            onClick={() => setSelect(k)} 
            />
            <EffectComposer multisampling={0}>
              <SSAO samples={31} radius={20} intensity={40} luminanceInfluence={0.1} color="black" />
            </EffectComposer>
          </Canvas>

        </li>
      })

     return(
       <ul class="grid">
          {tiles}
        </ul >
      )
}

function Profile(props){

  const history = useHistory();
  // here we delegate
  console.log()
  return(
    <div>
      <div style={{color: 'grey', paddingTop: '10px'}}>

        <div className="control-panel">
          actions
        </div>

         <Canvas
            shadowMap
            width={200}
            height={200}
            gl={{ alpha: true, antialias: false }}
            camera={{ fov: 75, position: [0, 0, 70], near: 10, far: 150 }}
            style={{margin: '10px'}}
            >
          <Swarm 
              count={1} 
              factored={3}
              color={factions[3].aura}
          />
          <ambientLight intensity={1.5} />
          <pointLight position={[100, 100, 100]} intensity={2} castShadow />
        </Canvas>
      </div>
      <ul className="grid">

      <li className="delegate-item" onClick={() => history.push("/lend") }>
        lend funds
      </li>
      <li className="delegate-item" onClick={() => history.push("/land")}>
        claim land
      </li>
      <li className="delegate-item" onClick={() => history.push("/participate")}>
        participate
      </li>
      </ul>
    </div>

    )
}

function IO(){
  // here we input
}

function Footer(props: any){
  // return(<div className='footer'>{'id: ' + loanId}</div>)
  return(<div className='footer'>{''}</div>)
}

function Header(props: any){
  return(
    <div className='header'>
      gov^10
      <div style={{color: 'grey', paddingTop: '10px'}}>
        move to (the) orbit, take back attention
      </div>
    </div>
    )
}

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
        onClick={() => props.setState((props.back == true ? props.state - 1 : props.state + 1))}
      > {isGo ? (props.prompt) : 'x'}</button>
    </div>)
}

function Main(){

  const [loanId, setLand] = useState(0)
  const [state, setState] = useState(1)

  const view = []

  state < 2 && view.push(<Header />)
  
  switch(state){
    case 1:
      view.push(<Matter setLand={setLand} setState={setState}/>)
      view.push(<Prompt state={state} setState={setState} message={"contribute to a future homestead, with others"} prompt={"go"}/>)
      view.push(<Footer />)
      break;
    case 2:
      view.push(<BioPool setState={setState} />)
      view.push(<Prompt state={state} setState={setState} message={"choose your pool, that matters"} prompt={"next > "}/>)
      break;
    case 3:
      view.push(<Profile setState={setState} />)
      view.push(<Prompt state={state} setState={setState} message={"we start together, here"} prompt={"< back"} back={true}/>)
      break;
    // case 1:
    //   view.push(<Lend/>)
    //   break;
  }

  return view
}


function App() {
  // tiles.push(
  //   <li class="grid-item" onClick={click}>
  //   <Canvas
  //     shadowMap
  //     gl={{ alpha: false, antialias: false }}
  //     camera={{ fov: 75, position: [0, 0, 70], near: 10, far: 150 }}
  //     onCreated={(state) => state.gl.setClearColor('#f0f0f0')}>
  //     <ambientLight intensity={1.5} />
  //     <pointLight position={[100, 100, 100]} intensity={2} castShadow />
  //     <pointLight position={[-100, -100, -100]} intensity={50} color="red" />
  //     <Swarm count={100} />
  //     <EffectComposer multisampling={0}>
  //       <SSAO samples={31} radius={20} intensity={40} luminanceInfluence={0.1} color="black" />
  //     </EffectComposer>
  //   </Canvas>
  //   </li>
  //   )

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   let k = 1
//   const tiles = [
//     // <li class="grid-item-u-l">{k++}</li>,
//     <li class="grid-item">{k++}</li>,
//     <li class="grid-item">{k++}</li>,
//     <li class="grid-item">{k++}</li>,
//     // <li class="grid-item-u-r">{k++}</li>,
//     <li class="grid-item">{k++}</li>,
//     <li class="grid-item">{k++}</li>,
//     <li class="grid-item">{k++}</li>,
//     // <li class="grid-item-l-l">{k++}</li>,
//     <li class="grid-item">{k++}</li>,
//     <li class="grid-item">{k++}</li>,
//     <li class="grid-item">{k++}</li>,
//     // <li class="grid-item-l-r">{k++}</li>
//   ]

//   console.log(tiles)

//   return (
//     <div className="App">
//         <ul class="grid">
//           {tiles}
//         </ul >
//     </div>
//   );
// }

// export default App;
