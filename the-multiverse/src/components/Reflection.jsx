import { ObjectGraphic } from "./graphics/ObjectGraphic";
import { CameraGraphic } from "./graphics/CameraGraphic";
import { Mirrors } from "./graphics/Mirrors";

export const Reflection = ({
  width,
  height,
  x,
  y,
  flipped,
  objectPos,
  cameraPos,
  opacity = 1,
}) => {
  const scale = flipped ? -1 : 1;
  const ypos = flipped ? y + height : y;
  return (
    <>
      <g transform={`translate(${x},${ypos})`}>
        <g transform={`scale(1 ${scale} )`}>
          {/* <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={"none"}
            stroke={"white"}
            strokeOpacity={0.3}
          /> */}
          <Mirrors width={width} height={height} opacity={opacity} />
          {/* <line
            x1={0}
            y1={2.5}
            x2={width}
            y2={2.5}
            stroke={"lightblue"}
            strokeWidth={5}
            strokeOpacity={opacity}
          />
          <line
            x1={0}
            y1={height - 2.5}
            x2={width}
            y2={height - 2.5}
            stroke={"lightblue"}
            strokeWidth={5}
            strokeOpacity={opacity}
          /> */}
          <ObjectGraphic x={objectPos.x} y={objectPos.y} opacity={opacity} />
          <CameraGraphic x={cameraPos.x} y={cameraPos.y} opacity={opacity} />
          {/* <circle
            cx={objectPos.x}
            cy={objectPos.y}
            r={10}
            fill={"red"}
            stroke={"black"}
            opacity={0.5}
          /> */}
        </g>
      </g>
    </>
  );
};
