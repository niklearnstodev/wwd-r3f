import React, { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function NodeAndString(props) {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "/models/5.gltf");
  console.log(nodes);
  useFrame(() => {
    group.current.rotation.y += 0.004;
  });
  return (
    <group>
      <mesh visible geometry={nodes["5"].geometry}>
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
