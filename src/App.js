import React, { Suspense } from "react";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";
import Geometries from "./seed/geometries";
import CameraControls from "./components/CameraControls";
import Sidebar from "./components/Sidebar";
import Node from "./components/Node";

extend({ OrbitControls });

export default function App() {
  const geometryDefinitions = Geometries;
  const [currentGeomtry, setCurrentGeometry] = React.useState(-1);

  function handleClick(i) {
    setCurrentGeometry(i === currentGeomtry ? -1 : i);
  }

  const wrappedGeometries = geometryDefinitions.map((geometry, i) => {
    return (
      <Suspense key={i} fallback={null}>
        <Node
          key={i}
          itemNumber={i}
          position={geometry.position}
          file={geometry.file}
          name={geometry.name}
          onClick={(item) => handleClick(item)}
          isActive={currentGeomtry === i}
          anyActive={currentGeomtry > -1}
          color={geometry.color}
          strings={geometry.strings}
          baseColor={geometry.color_base}
          clickedColor={geometry.color_clicked}
          greyColor={geometry.color_grey}
        />
      </Suspense>
    );
  });

  return (
    <div>
      <Canvas id="maincanvas">
        <CameraControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {wrappedGeometries}
      </Canvas>
      <div className="sidebar-container">
        {currentGeomtry > -1 ? (
          <Sidebar
            selectedItem={currentGeomtry}
            geometry={geometryDefinitions[currentGeomtry]}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
