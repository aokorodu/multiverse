import { useState, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { TheThing } from "./components/TheThing";
import { TheCamera } from "./components/TheCamera";
import { toSVGPoint } from "./utils/utils";
import { PerspectiveCamera } from "@react-three/drei";
import { Reflection } from "./components/Reflection";

function App() {
  const stage = useRef(null);
  const roomWidth = 200;
  const roomHeight = 100;
  const numOfReflections = 2;
  const svgWidth = roomWidth;
  const svgHeight = roomHeight * numOfReflections * 2 + roomHeight;
  const ballR = 10;
  const bounds = {
    left: ballR,
    right: roomWidth - ballR,
    top: ballR,
    bottom: roomHeight - ballR,
  };
  const defaultCameraPosition = { x: roomWidth / 2, y: roomHeight * 0.9 };
  const defaultObjectPosition = { x: roomWidth / 2, y: roomHeight / 2 };

  const [cameraPosition, setCameraPosition] = useState(defaultCameraPosition);
  const [objectPosition, setObjectPosition] = useState(defaultObjectPosition);

  let dragging = false;
  let draggedItem = "thing" | "camera";

  const startDrag = (item) => {
    console.log("startDrag");
    draggedItem = item;
    dragging = true;
    stage.current?.addEventListener("mousemove", drag);
    stage.current?.addEventListener("mouseout", stopDrag);
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
    updateObjectPositions(e.clientX, e.clientY);
  };

  const updateObjectPositions = (x, y) => {
    const pt = toSVGPoint(stage.current, x, y);
    if (pt.x < bounds.left) {
      pt.x = bounds.left;
    } else if (pt.x > bounds.right) {
      pt.x = bounds.right;
    }

    if (pt.y < bounds.top) {
      pt.y = bounds.top;
    } else if (pt.y > bounds.bottom) {
      pt.y = bounds.bottom;
    }
    draggedItem === "thing"
      ? setObjectPosition({ x: pt.x, y: pt.y })
      : setCameraPosition({ x: pt.x, y: pt.y });
  };

  const getCanvasPosition = (svgX, svgY) => {
    const xpos = svgX / 10;
    const zpos = svgY / 10;
    const obj = { x: xpos, y: 1, z: zpos };
    return [obj.x, obj.y, obj.z];
  };

  return (
    <>
      <div id="holder">
        <div id="svgHolder">
          <svg
            ref={stage}
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 ${roomHeight * -2} ${roomWidth} ${svgHeight}`}
          >
            <Reflection
              x={0}
              y={-2 * roomHeight}
              width={roomWidth}
              height={roomHeight}
              flipped={false}
              objectPos={objectPosition}
              cameraPos={cameraPosition}
              opacity={0.25}
            />
            <Reflection
              x={0}
              y={-roomHeight}
              width={roomWidth}
              height={roomHeight}
              flipped={true}
              objectPos={objectPosition}
              cameraPos={cameraPosition}
              opacity={0.5}
            />
            <Reflection
              x={0}
              y={roomHeight}
              width={roomWidth}
              height={roomHeight}
              flipped={true}
              objectPos={objectPosition}
              cameraPos={cameraPosition}
              opacity={0.5}
            />
            <Reflection
              x={0}
              y={2 * roomHeight}
              width={roomWidth}
              height={roomHeight}
              flipped={false}
              objectPos={objectPosition}
              cameraPos={cameraPosition}
              opacity={0.25}
            />
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
            <TheCamera
              x={cameraPosition.x}
              y={cameraPosition.y}
              r={ballR}
              mouseDown={startDrag}
            />
            <TheThing
              x={objectPosition.x}
              y={objectPosition.y}
              r={ballR}
              mouseDown={startDrag}
            />
          </svg>
        </div>
        <div id="canvasHolder">
          <Canvas>
            <PerspectiveCamera
              makeDefault
              fov={60}
              position={[cameraPosition.x / 10, 1, cameraPosition.y / 10]}
              onUpdate={(c) => c.updateProjectionMatrix()}
            ></PerspectiveCamera>
            <directionalLight position={[0, 1, 0.5]} />

            <mesh position={[objectPosition.x / 10, 1, objectPosition.y / 10]}>
              <sphereGeometry></sphereGeometry>
              <meshStandardMaterial color={"red"} />
            </mesh>
            {/* <mesh
              position={[
                objectPosition.x / 10,
                1,
                objectPosition.y / 5 - roomHeight / 5,
              ]}
            >
              <sphereGeometry></sphereGeometry>
              <meshStandardMaterial color={"red"} />
            </mesh> */}
            <gridHelper args={[200, 100, "grey"]} />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
