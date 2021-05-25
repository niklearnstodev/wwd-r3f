import React, { useRef, Suspense } from "react";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";
import Geometries from "./seed/geometries";
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
  const geometryDefinitions = Geometries;
  const [currentGeomtry, setCurrentGeometry] = React.useState(-1);

  function handleClick(i) {
    setCurrentGeometry(i === currentGeomtry ? -1 : i);
  }

  const wrappedGeometries = geometryDefinitions.map((geometry, i) => {
    return (
      <Suspense key={i} fallback={<Loading />}>
        <Geometry
          key={i}
          itemNumber={i}
          position={geometry.position}
          file={geometry.file}
          name={geometry.name}
          onClick={(item) => handleClick(item)}
          isActive={currentGeomtry === i}
          color={geometry.color}
        />
      </Suspense>
    );
  });

  function Geometry(props) {
    const group = useRef();
    const { nodes } = useLoader(GLTFLoader, props.file);
    return (
      <group ref={group}>
        <mesh
          visible
          geometry={nodes[props.name].geometry}
          onClick={(e) => {
            console.log(`Item ${props.itemNumber} selected!`);
            props.onClick(props.itemNumber);
          }}
        >
          <meshStandardMaterial
            attach="material"
            color={props.color}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
      </group>
    );
  }

  return (
    <div>
      <Canvas id="maincanvas">
        <CameraControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {wrappedGeometries}
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
      enableZoom={true}
      maxAzimuthAngle={100 * Math.PI}
      maxPolarAngle={100 * Math.PI}
      minAzimuthAngle={-100 * Math.PI}
      minPolarAngle={-100 * Math.PI}
    />
  );
};
