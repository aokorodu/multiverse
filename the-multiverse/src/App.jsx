import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { TheThing } from "./components/TheThing";
import { TheCamera } from "./components/TheCamera";
import { toSVGPoint } from "./utils/utils";
import { PerspectiveCamera } from "@react-three/drei";
import { Reflection } from "./components/Reflection";
import { Mirrors } from "./components/graphics/Mirrors";
import { degToRad } from "three/src/math/MathUtils.js";

function App() {
  const stage = useRef(null);
  const lineRefs = useRef([]);
  const roomWidth = 200;
  const roomHeight = 100;
  const lineColors = ["red", "yellow", "cyan", "green", "white"];
  const numOfReflections = 4;
  const svgWidth = roomWidth;
  const svgHeight = roomHeight + numOfReflections * roomHeight;
  const ballR = 10;
  const bounds = {
    left: ballR,
    right: roomWidth - ballR,
    top: ballR,
    bottom: roomHeight - ballR,
  };
  const defaultCameraPosition = { x: roomWidth * 0.7, y: roomHeight * 0.8 };
  const defaultObjectPosition = { x: roomWidth * 0.3, y: roomHeight / 2 };

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
    const num = numOfReflections;
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
          strokeOpacity={0.25}
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
    for (let i = 1; i < numOfReflections + 1; i++) {
      const ypos = i * roomHeight;
      const flipped = i % 2 == 0 ? false : true;
      const op = 0.75 / i;
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

    return arr;
  };

  const getReflectionPositions = () => {
    const arr = [];
    for (let i = 1; i < numOfReflections + 1; i++) {
      const startPoint = i * roomHeight;
      const flipped = i % 2 == 0 ? false : true;
      const ypos = flipped
        ? startPoint + (roomHeight - objectPosition.y)
        : startPoint + objectPosition.y;
      arr.push({ x: objectPosition.x, y: ypos });
    }
    return arr;
  };

  const drawLines = () => {
    const arr = getReflectionPositions();
    const num = lineRefs.current.length;

    for (let i = 0; i < num; i++) {
      const pline = lineRefs.current[i];
      const str = `${objectPosition.x},${objectPosition.y} ${arr[i].x},${arr[i].y} ${cameraPosition.x},${cameraPosition.y}`;
      pline.setAttribute("points", str);
      pline.setAttribute("stroke", lineColors[i]);
    }
  };

  const getMirrorReflectionPoints = () => {
    const reflectionPositions = getReflectionPositions();
    const num = reflectionPositions.length;
    const polylineArray = [];
    for (let i = 0; i < num; i++) {
      let startPoint =
        cameraPosition.x > objectPosition.x ? cameraPosition : objectPosition;
      let endPoint =
        startPoint == cameraPosition ? objectPosition : cameraPosition;
      const ylength = reflectionPositions[i].y - startPoint.y;
      const xlength = startPoint.x - endPoint.x;
      const tan = xlength / ylength;
      const mirrorX = startPoint.x - tan * (roomHeight - startPoint.y);
      const mirrorY = roomHeight;

      let dx = roomHeight * tan;
      if (xlength < 0) {
        dx *= -1;
      }

      const ptArray = [
        { x: startPoint.x, y: startPoint.y },
        { x: mirrorX, y: mirrorY },
      ];
      let index = 0;
      let totalDx = Math.abs(ptArray[0].x - ptArray[ptArray.length - 1].x);
      while (totalDx < xlength) {
        let xpos = ptArray[ptArray.length - 1].x - dx;
        let ypos = index % 2 == 0 ? 0 : roomHeight;
        if (xpos < endPoint.x) {
          xpos = endPoint.x;
          ypos = endPoint.y;
        }
        const nextPt = { x: xpos, y: ypos };
        ptArray.push(nextPt);
        totalDx = Math.abs(ptArray[0].x - ptArray[ptArray.length - 1].x);
        index++;
      }

      polylineArray.push(ptArray);
    }
    return polylineArray;
  };

  const getMirrorReflectionPolylines = () => {
    const arr = [];
    const reflPoints = getMirrorReflectionPoints();
    reflPoints.forEach((ptArray, index) => {
      let str = "";
      for (let i = 0; i < ptArray.length; i++) {
        const pt = ptArray[i];
        str = `${str} ${pt.x},${pt.y}`;
      }
      arr.push(
        <polyline points={str} stroke={lineColors[index]} fill="none" />
      );
    });
    return arr[3];
  };

  useEffect(() => {
    getReflectionPositions();
    drawLines();
    getMirrorReflectionPoints();
  }, [objectPosition, cameraPosition]);

  return (
    <>
      <div id="holder">
        <div id="svgHolder">
          <svg
            ref={stage}
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${roomWidth} ${svgHeight}`}
          >
            <g>{getReflections()}</g>
            <Mirrors width={roomWidth} height={roomHeight} />
            <g>{getLines()}</g>
            <g>{getMirrorReflectionPolylines()}</g>
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
              position={[
                cameraPosition.x / 10,
                1,
                (roomHeight - cameraPosition.y) / 10,
              ]}
              onUpdate={(c) => c.updateProjectionMatrix()}
            ></PerspectiveCamera>
            <directionalLight position={[0, 1, 0.5]} />

            <mesh
              position={[
                objectPosition.x / 10,
                1,
                (roomHeight - objectPosition.y) / 10,
              ]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <coneGeometry rotateX={"50deg"}></coneGeometry>
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
