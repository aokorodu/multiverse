import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { TheThing } from "./components/TheThing";
import { CameraSVG } from "./components/CameraSVG";
import { toSVGPoint, lineColors } from "./utils/utils";
import { PerspectiveCamera } from "@react-three/drei";
import { Reflection } from "./components/Reflection";
import { Mirrors } from "./components/graphics/Mirrors";
import { degToRad } from "three/src/math/MathUtils.js";
import { OrbitControls } from "@react-three/drei";
import { ConeObject } from "./components/graphics/ConeObject";
import { THREECamera } from "./components/THREECamera";
import { MirrorMesh } from "./components/graphics/MirrorMesh";
import { AngleGraphic } from "./components/AngleGraphic";

function App() {
  const stage = useRef(null);
  const lineRefs = useRef([]);
  const polyLinerefs = useRef([]);
  const roomWidth = 200;
  const roomHeight = 100;

  const numOfReflections = 10;
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
  const [activeReflection, setActiveReflection] = useState(1);

  const [cameraPosition, setCameraPosition] = useState(defaultCameraPosition);
  const [objectPosition, setObjectPosition] = useState(defaultObjectPosition);

  let dragging = false;
  let draggedItem = "thing" | "camera";

  const addToLineRefs = (el) => {
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
          ref={addToLineRefs}
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
    let reflectionOpacity = 0.5;
    for (let i = 1; i < numOfReflections + 1; i++) {
      const ypos = i * roomHeight;
      const flipped = i % 2 == 0 ? false : true;
      reflectionOpacity *= 0.9;
      arr.push(
        <Reflection
          x={0}
          y={ypos}
          width={roomWidth}
          height={roomHeight}
          flipped={flipped}
          objectPos={objectPosition}
          cameraPos={cameraPosition}
          opacity={reflectionOpacity}
          onClick={mirrorClick}
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

  const getMeshObjects = () => {
    const arr = [];
    const positionArray = getReflectionPositions();
    positionArray.forEach((pos, index) => {
      const rotation =
        index % 2 == 0 ? [Math.PI * 1.5, 0, 0] : [Math.PI * 0.5, 0, 0];
      arr.push(
        <mesh
          position={[pos.x / 10, 1, (roomHeight - pos.y) / 10]}
          rotation={rotation}
        >
          <coneGeometry></coneGeometry>
          <meshStandardMaterial color={"red"} />
        </mesh>
      );
    });

    return arr;
  };

  const getMeshMirrors = () => {
    const arr = [];
    for (let i = 0; i < numOfReflections; i++) {
      const zpos = i * -20;
      arr.push(<MirrorMesh z={zpos} />);
    }

    return arr;
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

  const addToPolylineRefs = (el) => {
    if (el && !polyLinerefs.current.includes(el)) {
      polyLinerefs.current.push(el);
    }
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
        <polyline
          ref={addToPolylineRefs}
          points={str}
          stroke={lineColors[index]}
          fill="none"
          strokeWidth={1}
        />
      );
    });
    return arr;
  };

  const switchOnLines = (n) => {
    if (n == activeReflection) return;
    setActiveReflection(n);
    const num = numOfReflections;
    for (let i = 0; i < num; i++) {
      const pl = polyLinerefs.current[i];
      const lr = lineRefs.current[i];
      if (i !== n) {
        pl.setAttribute("opacity", 0);
        lr.setAttribute("stroke-opacity", 0);
      } else {
        pl.setAttribute("opacity", 1);
        lr.setAttribute("stroke-opacity", 0.5);
      }
    }
  };

  const mirrorClick = (index) => {
    console.log(index);
    switchOnLines(index - 1);
  };

  const getAngle = () => {
    const ind = activeReflection == null ? 0 : activeReflection;
    const ptArray = getMirrorReflectionPoints()[ind];
    const pt = ptArray[1];

    const pt0 = ptArray[0];
    const pt1 = { x: pt0.x, y: roomHeight };
    const h = (pt1.y = pt0.y);
    const l = Math.abs(pt.x - pt1.x);
    const angle = Math.atan(h / l);
    const degrees = 90 - Math.round((angle * 180) / Math.PI);

    return (
      <g transform={`translate(${Math.round(pt.x)}, ${Math.round(pt.y)})`}>
        <text
          transform="scale(1 -1)"
          x={0}
          y={0}
          stroke="white"
        >{`${degrees}`}</text>
      </g>
    );
  };

  useEffect(() => {
    getReflectionPositions();
    drawLines();
    getMirrorReflectionPoints();
    getAngle();
  }, [objectPosition, cameraPosition]);

  useEffect(() => {
    switchOnLines(0);
  }, []);

  return (
    <>
      <div id="holder">
        <div id="svgHolder">
          <svg
            ref={stage}
            width={"100%"}
            height={"100%"}
            viewBox={`0 0 ${roomWidth} ${svgHeight}`}
          >
            <g>{getReflections()}</g>
            <Mirrors width={roomWidth} height={roomHeight} />
            <g>{getLines()}</g>
            <g>{getMirrorReflectionPolylines()}</g>
            <CameraSVG
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
            {getAngle()}
          </svg>
        </div>
        <div id="contentHolder">
          <div id="canvasHolder">
            <Canvas>
              <THREECamera position={cameraPosition} roomHeight={roomHeight} />
              <directionalLight position={[0, 1, 0.5]} />
              <ConeObject position={objectPosition} roomHeight={roomHeight} />
              {getMeshObjects()}

              {getMeshMirrors()}

              <gridHelper args={[200, 100, "#383838", "#383838"]} />
              {/* <OrbitControls /> */}
            </Canvas>
          </div>
          {/* <AngleGraphic /> */}
        </div>
      </div>
    </>
  );
}

export default App;
