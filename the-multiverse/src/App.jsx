import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { TheThing } from "./components/TheThing";
import { TheCamera } from "./components/TheCamera";
import { toSVGPoint } from "./utils/utils";
import { PerspectiveCamera } from "@react-three/drei";
import { Reflection } from "./components/Reflection";
import { Mirrors } from "./components/graphics/Mirrors";

function App() {
  const stage = useRef(null);
  // const lineRef = useRef(null);
  const lineRefs = useRef([]);
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

  const addToRefs = (el) => {
    if (el && !lineRefs.current.includes(el)) {
      lineRefs.current.push(el);
    }
  };

  const getLines = () => {
    const num = numOfReflections * 2;
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(
        <polyline
          ref={addToRefs}
          x1={0}
          y1={0}
          x2={0}
          y2={0}
          stroke={"red"}
          fill="none"
        />
      );
    }

    return arr;
  };

  const startDrag = (item) => {
    draggedItem = item;
    dragging = true;
    stage.current?.addEventListener("mousemove", drag);
    stage.current?.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = () => {
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

  const getReflections = () => {
    const arr = [];
    for (let i = -2; i < numOfReflections + 1; i++) {
      if (i !== 0) {
        const ypos = i * roomHeight;
        console.log("ypos:", ypos);
        const flipped = i % 2 == 0 ? false : true;
        const op = 0.5 / Math.abs(i);
        arr.push(
          <Reflection
            x={0}
            y={ypos}
            width={roomWidth}
            height={roomHeight}
            flipped={flipped}
            objectPos={objectPosition}
            cameraPos={cameraPosition}
            opacity={op}
          />
        );
      }
    }

    return arr;
  };

  const getObjectPositions = () => {
    const arr = [];
    for (let i = -2; i < numOfReflections + 1; i++) {
      if (i !== 0) {
        const startPoint = i * roomHeight;
        console.log("startPoint:", startPoint);
        const flipped = i % 2 == 0 ? false : true;
        //const dy = flipped ? roomHeight - objectPosition.y : objectPosition.y;
        const ypos = flipped
          ? startPoint + (roomHeight - objectPosition.y)
          : startPoint + objectPosition.y;
        console.log("ypos: ", ypos);
        arr.push({ x: objectPosition.x, y: ypos });
      }
    }
    return arr;
  };

  const drawLines = () => {
    const arr = getObjectPositions();
    const num = lineRefs.current.length;
    const colors = ["red", "yellow", "blue", "green"];
    for (let i = 0; i < num; i++) {
      const pline = lineRefs.current[i];
      const str = `${objectPosition.x},${objectPosition.y} ${arr[i].x},${arr[i].y} ${cameraPosition.x},${cameraPosition.y}`;
      pline.setAttribute("points", str);
      // pline.setAttribute("y1", objectPosition.y);
      // pline.setAttribute("x2", arr[i].x);
      // pline.setAttribute("y2", arr[i].y);
      pline.setAttribute("stroke", colors[i]);
    }
    // const line = lineRef.current;
    // line.setAttribute("x1", objectPosition.x);
    // line.setAttribute("y1", objectPosition.y);
    // line.setAttribute("x2", arr[2].x);
    // line.setAttribute("y2", arr[2].y);
  };

  useEffect(() => {
    console.log("useEffect");
    getObjectPositions();
    drawLines();
  }, [objectPosition, cameraPosition]);

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
            <g>{getReflections()}</g>
            <Mirrors width={roomWidth} height={roomHeight} />
            {/* <line ref={lineRef} x1={0} y1={0} x2={0} y2={0} stroke={"red"} /> */}
            <g>{getLines()}</g>
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
