import { useState, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "three";

function App() {
  const stage = useRef(null);
  const roomWidth = 200;
  const roomHeight = 100;
  const defaultPersonPosition = { x: roomWidth / 2, y: (roomHeight * 3) / 4 };
  const defaultObjectPosition = { x: roomWidth / 2, y: roomHeight / 2 };

  const [personPosition, setPersonPosition] = useState(defaultPersonPosition);
  const [objectPosition, setObjectPosition] = useState(defaultObjectPosition);

  let dragging = false;
  const startDrag = () => {
    console.log("startDrag");
    dragging = true;
    stage.current?.addEventListener("mousemove", drag);
    stage.current?.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = () => {
    console.log("stop dragging");
    dragging = false;
    stage.current?.removeEventListener("mousemove", drag);
    stage.current?.removeEventListener("mouseup", stopDrag);
  };

  const drag = (e) => {
    if (!dragging) return;
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
  };

  const getCanvasPosition = (x, y) => {};

  // const CameraHelper = () => {
  //   const camera = new PerspectiveCamera(90, 2, 1, 5);

  //   return (
  //     <group position={[10, 0, 49]}>
  //       <cameraHelper args={[camera]} />
  //     </group>
  //   );
  // };

  return (
    <>
      <div>
        <div id="svgHolder">
          <svg
            ref={stage}
            width={roomWidth}
            height={roomHeight}
            viewBox={`0 0 ${roomWidth} ${roomHeight}`}
          >
            <rect
              x={0}
              y={0}
              width={roomWidth}
              height={roomHeight}
              fill={"none"}
              stroke={"white"}
              strokeOpacity={0.3}
            />
            <line
              x1={0}
              y1={0}
              x2={500}
              y2={0}
              stroke={"lightblue"}
              strokeWidth={5}
            />
            <circle
              onMouseDown={startDrag}
              cx={objectPosition.x}
              cy={objectPosition.y}
              r={10}
              fill={"red"}
              stroke={"black"}
            />
          </svg>
        </div>
        <div id="canvasHolder">
          <Canvas
            camera={{
              position: [10, 0, 29],
              rotation: [0, 0, 0],
              fov: 20,
              near: 1,
              far: 100,
            }}
          >
            <directionalLight position={[0, 2, 0]} />
            <mesh position={[personPosition.x / 10, 0, 0]}>
              <sphereGeometry></sphereGeometry>
              <meshStandardMaterial color={"red"} />
            </mesh>
            {/* <CameraHelper /> */}
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
