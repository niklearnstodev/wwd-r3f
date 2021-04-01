import React, { useRef, Suspense } from "react";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Box from "./components/Box";
import "./App.css";
import CubeDefs from "./seed/cubes";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

extend({ OrbitControls });

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

export default function App() {
  const cubes = CubeDefs;
  const [currentCube, setCurrentCube] = React.useState(-1);

  function handleClick(i) {
    setCurrentCube(i === currentCube ? -1 : i);
  }

  const tdCubes = cubes.map((cube, i) => {
    return (
      <Box
        key={i}
        position={cube.position}
        itemNumber={i}
        onClick={(item) => handleClick(item)}
        isActive={currentCube === i}
      />
    );
  });

  return (
    <div>
      <div className="info-container">
        {currentCube < 0 ? null : (
          <div className="selected-container">
            <div className="selected-container__header">
              {cubes[currentCube].title}
            </div>
            <div className="selected-container__body">
              {cubes[currentCube].description}
            </div>
          </div>
        )}
      </div>
      <Canvas id="maincanvas">
        {/* <CameraControls /> */}
        {/* <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} /> */}
        <Suspense fallback={<Loading />}>
          <NodeAndString />
        </Suspense>
        {/* {tdCubes} */}
      </Canvas>
    </div>
  );
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={100 * Math.PI}
      maxPolarAngle={100 * Math.PI}
      minAzimuthAngle={-100 * Math.PI}
      minPolarAngle={-100 * Math.PI}
    />
  );
};

function NodeAndString() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "./models/nodestring.gltf");
  console.log(nodes);
  useFrame(() => {
    group.current.rotation.y += 0.004;
  });
  return (
    <group ref={group}>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="black"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}
