import { useState, useRef } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { TheThing } from "./components/TheThing";
import { TheCamera } from "./components/TheCamera";
import { toSVGPoint } from "./utils/utils";

function App() {
  const stage = useRef(null);
  const roomWidth = 200;
  const roomHeight = 100;
  const ballR = 10;
  const left = ballR;
  const right = roomWidth - ballR;
  const top = ballR;
  const bottom = roomHeight - ballR;
  const defaultCameraPosition = { x: roomWidth / 2, y: roomHeight * 0.9 };
  const defaultObjectPosition = { x: roomWidth / 2, y: roomHeight / 2 };

  const [cameraPosition, setPersonPosition] = useState(defaultCameraPosition);
  const [objectPosition, setObjectPosition] = useState(defaultObjectPosition);

  let dragging = false;

  const startDrag = () => {
    console.log("startDrag");
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
    if (pt.x < left) {
      pt.x = left;
    } else if (pt.x > right) {
      pt.x = right;
    }

    if (pt.y < top) {
      pt.y = top;
    } else if (pt.y > bottom) {
      pt.y = bottom;
    }
    setObjectPosition({ x: pt.x, y: pt.y });
    console.log(pt.x, pt.y);
  };

  const getCanvasPosition = (svgX, svgY) => {
    const xpos = svgX / 10;
    const zpos = svgY / 10;
    const obj = { x: xpos, y: 1, z: zpos };
    return [obj.x, obj.y, obj.z];
  };

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
            <TheCamera x={cameraPosition.x} y={cameraPosition.y} r={ballR} />
            <TheThing
              x={objectPosition.x}
              y={objectPosition.y}
              r={ballR}
              mouseDown={startDrag}
            />
          </svg>
        </div>
        <div id="canvasHolder">
          <Canvas
            camera={{
              position: getCanvasPosition(
                cameraPosition.x,
                cameraPosition.y * 2
              ),
              rotation: [0, 0, 0],
              fov: 40,
              near: 1,
              far: 100,
            }}
          >
            <directionalLight position={[0, 2, 0]} />
            <mesh position={[objectPosition.x / 10, 1, objectPosition.y / 10]}>
              <sphereGeometry></sphereGeometry>
              <meshStandardMaterial color={"red"} />
            </mesh>
            <gridHelper args={[200, 100, "grey"]} />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
