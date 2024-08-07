import { useState, useRef, useEffect } from "react";
import "../App.css";
import { Canvas } from "@react-three/fiber";
import { TheThing } from "./TheThing";
import { ObserverGraphic } from "./ObserverGraphic";
import { toSVGPoint, lineColors } from "../utils/utils";
import { Reflection } from "./Reflection";
import { Mirrors } from "./graphics/Mirrors";
import { ConeObject } from "./graphics/ConeObject";
import { THREECamera } from "./THREECamera";
import { MirrorMesh } from "./graphics/MirrorMesh";
import { AngleGraphic } from "./AngleGraphic";
import { AngleInfo } from "./AngleInfo";
import { DistanceInfo } from "./DistanceInfo";
import { ReflectionLine } from "./ReflectionLine";
import Button from "@mui/material/Button";
import { ZoomButton } from "./ZoomButton";

function TheScene({ numOfReflections = 6, roomWidth, roomHeight }) {
  const stage = useRef(null);
  const lineRefs = useRef([]);
  const reflectionLineRefs = useRef([]);
  const svgHeight = roomHeight + numOfReflections * roomHeight;
  const ballR = 10;
  const bounds = {
    left: ballR,
    right: roomWidth - ballR,
    top: ballR,
    bottom: roomHeight - ballR,
  };
  const defaultCameraPosition = { x: roomWidth * 0.6, y: roomHeight * 0.2 };
  const defaultObjectPosition = { x: roomWidth * 0.3, y: roomHeight / 2 };
  const [activeReflection, setActiveReflection] = useState(0);
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
    console.log(e);
    updateObjectPositions(Math.abs(e.clientX), Math.abs(e.clientY));
  };

  const updateObjectPositions = (x, y) => {
    console.log("y:", Math.abs(y));
    const pt = toSVGPoint(stage.current, Math.abs(x), Math.abs(y));
    pt.y = Math.abs(pt.y);
    console.log("pt: ", pt);
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
    let reflectionOpacity = 0.9;
    for (let i = 1; i < numOfReflections + 1; i++) {
      const ypos = i * roomHeight;
      const flipped = i % 2 == 0 ? false : true;
      reflectionOpacity *= 0.95;
      arr.push(
        <Reflection
          key={ypos}
          x={0}
          y={ypos}
          width={roomWidth}
          height={roomHeight}
          flipped={flipped}
          objectPos={objectPosition}
          cameraPos={cameraPosition}
          opacity={reflectionOpacity}
          onClick={mirrorClick}
          selected={i - 1 == activeReflection ? true : false}
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
        <ConeObject
          position={pos}
          rotation={rotation}
          roomHeight={roomHeight}
          selected={index == activeReflection ? true : false}
        />
      );
    });

    return arr;
  };

  const getMeshMirrors = () => {
    const arr = [];
    for (let i = 0; i < numOfReflections; i++) {
      const zpos = i * -20;
      arr.push(<MirrorMesh z={zpos} width={roomWidth} height={roomHeight} />);
    }

    return arr;
  };

  const getMirrorReflectionPoints = () => {
    const reflectionPositions = getReflectionPositions();
    const num = reflectionPositions.length;
    const polylineArray = [];
    for (let i = 0; i < num; i++) {
      let startPoint = cameraPosition;
      let endPoint = objectPosition;

      const dir = startPoint.x > endPoint.x ? -1 : 1;
      const ylength = Math.abs(reflectionPositions[i].y - startPoint.y);
      const xlength = Math.abs(startPoint.x - endPoint.x);
      const tan = xlength / ylength;
      const mirrorX = startPoint.x + dir * tan * (roomHeight - startPoint.y);
      const mirrorY = roomHeight;

      let dx = dir * roomHeight * tan;

      const ptArray = [
        { x: startPoint.x, y: startPoint.y },
        { x: mirrorX, y: mirrorY },
      ];
      let index = 0;
      let totalDx = Math.abs(ptArray[0].x - ptArray[ptArray.length - 1].x);

      while (totalDx < xlength) {
        let xpos = ptArray[ptArray.length - 1].x + dx;
        const newDist = Math.abs(xpos - ptArray[0].x);
        let ypos = index % 2 == 0 ? 0 : roomHeight;
        if (newDist >= xlength) {
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

  const addToReflectionLineRefs = (el) => {
    if (el && !reflectionLineRefs.current.includes(el)) {
      reflectionLineRefs.current.push(el);
    }
  };

  const getMirrorReflectionPolylines = () => {
    const arr = [];
    const reflPoints = getMirrorReflectionPoints();

    reflPoints.forEach((ptArray, index) => {
      const num = ptArray.length;
      let str = "";
      let dur = `${num}s`;
      for (let i = 0; i < ptArray.length; i++) {
        const prefix = i == 0 ? "M" : "L";
        const pt = ptArray[i];
        str = `${str} ${prefix}${pt.x},${pt.y}`;
      }
      arr.push(
        <g ref={addToReflectionLineRefs}>
          <ReflectionLine
            numberOfPoints={num}
            pointString={str}
            color={lineColors[index]}
          />
        </g>
      );
    });
    return arr;
  };

  const switchOnLines = (n) => {
    if (n == activeReflection) {
      // same as current, don't do anything
      return;
    }

    const newActiveLineNum = n < 0 ? 0 : n;
    setActiveReflection(newActiveLineNum);
    const num = numOfReflections;
    for (let i = 0; i < num; i++) {
      const pl = reflectionLineRefs.current[i];
      const lr = lineRefs.current[i];
      if (i !== newActiveLineNum) {
        pl.setAttribute("opacity", 0);
        lr.setAttribute("stroke-opacity", 0);
      } else {
        pl.setAttribute("opacity", 1);
        lr.setAttribute("stroke-opacity", 0.5);
      }
    }
  };

  const mirrorClick = (index) => {
    switchOnLines(index);
  };

  const getAngleValue = () => {
    const ind = activeReflection == null ? 0 : activeReflection;
    const ptArray = getMirrorReflectionPoints()[ind];
    const pt = ptArray[1];

    const pt0 = ptArray[0];
    const pt1 = { x: pt0.x, y: roomHeight };
    const h = pt1.y - pt0.y;
    const l = Math.abs(pt.x - pt1.x);
    const angle = Math.atan(h / l);
    const degrees = Math.round((angle * 180) / Math.PI);

    return { degrees: degrees, point: pt };
  };

  const getAngle = () => {
    const { degrees, point } = getAngleValue();

    return <AngleGraphic point={point} angle={degrees} />;
  };

  const getAngleInfo = () => {
    const { degrees } = getAngleValue();

    return <AngleInfo degrees={degrees} />;
  };

  const getDistanceValue = () => {
    const pt = getReflectionPositions()[activeReflection];
    const length = Math.abs(cameraPosition.y - pt.y);
    const width = Math.abs(cameraPosition.x - objectPosition.x);
    const hyp = Math.sqrt(length * length + width * width);

    return hyp;
  };

  const getDistanceInfo = () => {
    const dist = getDistanceValue();

    return (
      <>
        <DistanceInfo
          distance={dist}
          roomWidth={roomWidth}
          roomHeight={roomHeight}
        />
      </>
    );
  };

  useEffect(() => {
    getReflectionPositions();
    drawLines();
    getMirrorReflectionPoints();
  }, [objectPosition, cameraPosition]);

  useEffect(() => {
    switchOnLines(-1);
  }, []);

  const zoom = (e) => {
    console.log(e);
    const viewBox = stage.current.getAttribute("viewBox");
    const arr = viewBox.split(" ");
    console.log("viewBox: ", viewBox);
    let vbh = eval(arr[arr.length - 1]);
    console.log("vbh:", vbh);
    if (vbh == roomHeight) {
      vbh = svgHeight;
    } else {
      vbh = roomHeight;
    }
    stage.current.setAttribute("viewBox", `0 0 ${roomWidth} ${vbh}`);
  };

  return (
    <>
      <div id="holder">
        <Button
          variant="text"
          id="zoom"
          onClick={(e) => {
            zoom(e);
          }}
        >
          <ZoomButton />
        </Button>
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
            <ObserverGraphic
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
            </Canvas>
            <div id="statsHolder">
              {getAngleInfo()}
              {getDistanceInfo()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TheScene;
