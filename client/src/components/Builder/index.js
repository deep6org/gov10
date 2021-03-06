import './index.css'

import * as THREE from "three"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import React, { Suspense, useRef, useState, useEffect, useContext } from "react"
import { ContactShadows } from "@react-three/drei"
import { A11y, useA11y, A11yAnnouncer } from "@react-three/a11y"
import { ResizeObserver } from "@juggle/resize-observer"
import { proxy, useProxy } from "valtio"
import { EffectComposer, SSAO, SMAA } from "@react-three/postprocessing"
import GlobalState from '../../contexts/GlobalState';
import {CopyToClipboard} from 'react-copy-to-clipboard';


import {DualPrompt} from '../Prompt'

import Header from '../Header'

const state = proxy({ dark: false, active: 0, rotation: 0, disabled: false, isRedemption: false })

const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 )
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh1 = new THREE.Mesh( geometry, material );

const geometries = [
  // TODO: Add colors
  geometry,
  new THREE.BoxBufferGeometry( 1, 1, 1 ),
  new THREE.BoxBufferGeometry( 1, 1, 1 ),
  new THREE.BoxBufferGeometry( 1, 1, 1 ),
  new THREE.BoxBufferGeometry( 1, 1, 1 ),
  new THREE.BoxBufferGeometry( 1, 1, 1 ),
  new THREE.BoxBufferGeometry( 1, 1, 1 ),
  new THREE.BoxBufferGeometry( 1, 1, 1 ),
  new THREE.SphereBufferGeometry(1, 32, 32),
  // new THREE.TetrahedronBufferGeometry(1.5),
  // new THREE.TorusBufferGeometry(1, 0.35, 16, 32),
  // new THREE.OctahedronGeometry(1.5),
  // new THREE.IcosahedronBufferGeometry(1.5),
]

const matter = {
    0: {name: "mer", color: 'grey'},
    1: {name: "ven", color: 'pink'},
    2: {name: "ear", color: 'green'},
    3: {name: "mar", color: 'orange'},
    4: {name: "jup", color: 'red'},
    5: {name: "sat", color: 'yellow'},
    6: {name: "ura", color: 'blue'},
    7: {name: "nep", color: 'purple'},
    8: {name: "all", color: 'lightgrey'},
  }



function ToggleButton(props) {
  const a11y = useA11y()
  return (
    <mesh {...props}>
      <torusGeometry args={[0.5, a11y.pressed ? 0.28 : 0.25, 16, 32]} />
      <meshStandardMaterial color={a11y.focus ? "lightsalmon" : a11y.hover ? "lightpink" : "lightblue"} />
    </mesh>
  )
}

function SwitchButton(props) {
  const a11y = useA11y()
  return (
    <>
      <mesh {...props} rotation={[0, 0, a11y.pressed ? Math.PI / 4 : -Math.PI / 4]}>
        <boxBufferGeometry args={[0.3, 2, 0.3]} />
        <meshStandardMaterial color={a11y.focus ? "lightsalmon" : a11y.hover ? "lightpink" : "lightblue"} />
      </mesh>
      <mesh {...props}>
        <torusGeometry args={[0.3, 0.2, 16, 20]} />
        <meshStandardMaterial color={a11y.focus ? "lightsalmon" : a11y.hover ? "lightpink" : "lightblue"} />
      </mesh>
    </>
  )
}

function Floor(props) {
  return (
    <>
      <ContactShadows rotation-x={Math.PI / 2} position={[0, -5, 0]} opacity={0.4} width={30} height={30} blur={1} far={15} />
      <mesh {...props} position={[0, -5.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[30, 30, 1]} />
        <meshStandardMaterial color={"#eef5f7"} />
      </mesh>
    </>
  )
}

function Nav({ left }) {
  const snap = useProxy(state)
  const { viewport } = useThree()
  const radius = Math.min(12, viewport.width / 2.5)
  console.log(snap)
  return (
    <A11y
      role="button"
      description={`Press to show the ${left ? "left" : "right"} shape`}
      activationMsg="shape showing"
      actionCall={() => {
        // change 9 to number of objects
        state.rotation = snap.rotation + ((Math.PI * 2) / 9) * (left ? -1 : 1)

        state.active = left ? (snap.active === 0 ? 8 : snap.active - 1) : snap.active === 8 ? 0 : snap.active + 1
      }}
      disabled={snap.disabled}>
      <Diamond position={[left ? -radius : radius, 0, 0]} rotation={[0, 0, -Math.PI / 8]} />
    </A11y>
  )
}

function Diamond({ position, rotation }) {
  const a11y = useA11y()
  return (
    <mesh position={position} rotation={rotation}>
      <tetrahedronBufferGeometry />
      <meshPhongMaterial color={a11y.focus ? "lightsalmon" : a11y.hover ? "lightpink" : "lightblue"} />
    </mesh>
  )
}

function Shape({ index, active, ...props }) {
  const snap = useProxy(state)
  const vec = new THREE.Vector3()
  const ref = useRef()
  useFrame((state, delta) => {
    if (snap.disabled) {
      return
    }
    const s = active ? 2 : 1
    ref.current.scale.lerp(vec.set(s, s, s), 0.1)
    ref.current.rotation.y = ref.current.rotation.x += delta / (active ? 1.5 : 4)
    ref.current.position.y = active ? Math.sin(state.clock.elapsedTime) / 2 : 0
  })
  return (
    <mesh rotation-y={index * 2000} ref={ref} {...props} geometry={geometries[index]}>
      <meshPhongMaterial color={matter[index].color}/>
    </mesh>
  )
}

function Carroussel() {
  const { viewport } = useThree()
  const snap = useProxy(state)
  const group = useRef()
  // adjust this for radius
  const radius = Math.min(7, viewport.width / 5)
  useFrame(() => (group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, snap.rotation - Math.PI / 2, 0.1)))
  return (
    <group ref={group}>
      {["sphere", "pyramid", "square","square","square","square", "donut", "octahedron", "icosahedron"].map((name, i) => (
        <A11y key={name} role="content" description={`a ${name}`} tabIndex={-1}>
          <Shape
            index={i}
            // adjust 9 to change positioning
            position={[radius * Math.cos(i * ((Math.PI * 2) / 9)), 0, radius * Math.sin(i * ((Math.PI * 2) / 9))]}
            active={snap.active === i}
            color={0xff0000}
          />
        </A11y>
      ))}
    </group>
  )
}


function redeem (setRedeem, setKey) {
  console.log('redeem')
  // execute a redeem function to reverse the payment
  console.log('executing transaction')
  setRedeem(true)
  // get key from contract
  setKey("b6a385ba8f14ac4403721c27c6960432791e347b8676641fa381bd95a9e85812")

}

function Prompt(props){
  
  const [isGo, setGo] = useState(true);
  const [isRedeem, setRedeem] = useState(false);
  const [key, setKey] = useState("");
  const [copied, setCopied] = useState(false);

  console.log(isRedeem)

  return(    
   <div className="go-wrapper">

      {! isRedeem ? 

      <>        
      <div className="about-wrapper">
         {props.message}
      </div>
      <button className="but"
        style={{cursor: 'pointer'}}
        onMouseEnter={() => setGo(false)}
        onMouseLeave={() => setGo(true)}
        onClick={() => redeem(setRedeem, setKey)}
      > {isGo ? (props.prompt) : 'x'}</button>
      </> :        
      <ul className="grid" >
        <li className="spectrum-item-static" style={{height: '100px'}}>
            <>
              0xE04.. owned
              <img src={"https://i.pinimg.com/originals/56/3d/81/563d81a451d0f08a6da9be76a5604a28.gif"} alt="~" className="thumbnail-spectrum"/>
            </>

        <CopyToClipboard text={key}
          onCopy={() => setCopied(true)}>
          <div>{key.substring(0,3) + "... swarm key"}</div>
        </CopyToClipboard>
        </li>
        <br/>
      </ul>
    }
    </div>)
}

function BioInspect(props){
  console.log(props.snap)
  const snap = useProxy(state)
  console.log(props.snap !== undefined)

  return(
    <>
    <div className="builder-pool">{snap !== undefined ? matter[snap.active].name : ''}
    </div>
    {
        state.active != 3 ? 
        <DualPrompt message={"what pool would you like to build for?"} prompt1={"inspect"} prompt2={"register"} nextPath={'/register'}/>
        :<Prompt message={"available for redemption"} prompt={"redeem"} onClick={redeem} nextPath={'/redeem'}/>
      }
    </>

    )
}

export default function Builder() {

  // const [state, setState] = useContext(GlobalState);

  // useEffect(() => {
    
  // }, []);

  const snap = useProxy(state)

  const [bought, isBought] = useState(false)

  console.log(state)
  console.log(snap)
  console.log(bought)

  return (
    <div className="builder">
      <Header title={"build"} />
      <div className="builder-wrapper">
        <main className={snap.dark ? "dark" : "bright"}>
          <Canvas resize={{ polyfill: ResizeObserver }} camera={{ position: [0, 0, 15], near: 4, far: 30 }} pixelRatio={[1, 1.5]}>
            <pointLight position={[100, 100, 100]} intensity={snap.disabled ? 0.2 : 0.5} />
            <pointLight position={[-100, -100, -100]} intensity={1.5} color="red" />
            <ambientLight intensity={snap.disabled ? 0.2 : 0.8} />
            <group position-y={0}>
              <Nav left />
              <Nav />
              <Carroussel />
              {/*<Floor />*/}
              
             {/*<A11y
                role="button"
                description="Light lowering button"
                pressedDescription="Light lowering button, activated"
                actionCall={() => (state.dark = !snap.dark)}
                activationMsg="Lower light enabled"
                deactivationMsg="Lower light disabled"
                disabled={snap.disabled}
                debug={true}
                a11yElStyle={{ marginLeft: "-40px" }}>
                <ToggleButton position={[0, -3, 9]} />
              </A11y>

               <A11y
                role="button"
                pressed={true}
                description="Power button, click to disable the scene"
                pressedDescription="Power button, click to turn on the scene"
                actionCall={() => (state.disabled = !snap.disabled)}
                activationMsg="Scene activated"
                deactivationMsg="Scene disabled">
                <SwitchButton position={[-3, -5, 7]} />

              </A11y>
              */}
            </group>
            <Suspense fallback={null}>
              <EffectComposer multisampling={0}>
                <SSAO radius={20} intensity={50} luminanceInfluence={0.1} color="#154073" />
                <SMAA />
              </EffectComposer>
            </Suspense>
          </Canvas>
          <A11yAnnouncer />
        </main>
      </div>
      <BioInspect state={snap}/>
    </div>
  )
}
