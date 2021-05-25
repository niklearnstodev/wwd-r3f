import React, { useRef } from "react";

export default function Box(props) {
  const mesh = useRef();

  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={(e) => {
        console.log(`Item ${props.itemNumber} selected!`);
        props.onClick(props.itemNumber);
      }}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.isActive ? "#820263" : "#D90368"} />
    </mesh>
  );
}
