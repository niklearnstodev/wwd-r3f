import React from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Strings(props) {
  const { nodes } = useLoader(GLTFLoader, props.file);

  return (
    <mesh visible geometry={nodes[props.name].geometry}>
      <meshStandardMaterial
        attach="material"
        color={props.color}
        roughness={0.3}
        metalness={0.3}
      />
    </mesh>
  );
}
