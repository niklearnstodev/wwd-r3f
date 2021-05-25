import { useRef } from "react";
import { useThree, useFrame } from "react-three-fiber";

export default function CameraControls() {
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
}
