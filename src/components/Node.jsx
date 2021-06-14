import React, { useRef } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Strings from "./Strings";

export default function Node(props) {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, props.file);
  const activeColor = props.isActive ? props.clickedColor : props.baseColor;
  const strings = props.strings.map((stringsSet) => {
    return (
      <Strings
        color={activeColor}
        file={stringsSet.file}
        name={stringsSet.name}
        key={stringsSet.name}
      />
    );
  });

  return (
    <group ref={group}>
      <mesh
        visible
        geometry={nodes[props.name].geometry}
        onClick={(e) => {
          props.onClick(props.itemNumber);
        }}
      >
        <meshStandardMaterial
          attach="material"
          color={activeColor}
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
      {strings}
    </group>
  );
}
