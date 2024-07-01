import { ObjectGraphic } from "./graphics/ObjectGraphic";
// import { CameraGraphic } from "./graphics/CameraGraphic";
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
  onClick,
}) => {
  const scale = flipped ? -1 : 1;
  const ypos = flipped ? y + height : y;
  const index = y / height;

  console.log("reflection index: ", index);
  const clickHandler = () => {
    onClick(index);
  };

  return (
    <>
      <g transform={`translate(${x},${ypos})`} onClick={clickHandler}>
        <g transform={`scale(1 ${scale} )`}>
          <Mirrors width={width} height={height} opacity={opacity} />
          <ObjectGraphic x={objectPos.x} y={objectPos.y} opacity={opacity} />
          {/* <CameraGraphic x={cameraPos.x} y={cameraPos.y} opacity={opacity} /> */}
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={"white"}
            fillOpacity={0}
          />
        </g>
      </g>
    </>
  );
};
