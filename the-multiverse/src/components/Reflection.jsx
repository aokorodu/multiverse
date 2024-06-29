import { ObjectGraphic } from "./graphics/ObjectGraphic";
import { CameraGraphic } from "./graphics/CameraGraphic";

export const Reflection = ({
  width,
  height,
  x,
  y,
  flipped,
  objectPos,
  cameraPos,
}) => {
  const scale = flipped ? -1 : 1;
  const ypos = flipped ? y + height : y;
  return (
    <>
      <g transform={`translate(${x},${ypos})`}>
        <g transform={`scale(1 ${scale} )`}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={"none"}
            stroke={"white"}
            strokeOpacity={0.3}
          />
          <line
            x1={0}
            y1={0}
            x2={width}
            y2={0}
            stroke={"lightblue"}
            strokeWidth={5}
          />
          <ObjectGraphic x={objectPos.x} y={objectPos.y} opacity={0.5} />
          <CameraGraphic x={cameraPos.x} y={cameraPos.y} opacity={0.5} />
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
