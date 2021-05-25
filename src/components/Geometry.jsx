import React, { useRef } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Geometry(props) {
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
