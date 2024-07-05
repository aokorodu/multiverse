import { ObjectGraphic } from "./graphics/ObjectGraphic";
import { Mirrors } from "./graphics/Mirrors";

export const Reflection = ({
  width,
  height,
  x,
  y,
  flipped,
  objectPos,
  opacity = 1,
  onClick,
  selected = false,
}) => {
  const scale = flipped ? -1 : 1;
  const ypos = flipped ? y + height : y;
  const index = y / height - 1;
  const clickHandler = () => {
    onClick(index);
  };

  return (
    <>
      <g transform={`translate(${x},${ypos})`} onClick={clickHandler}>
        <g transform={`scale(1 ${scale} )`}>
          <Mirrors
            width={width}
            height={height}
            opacity={selected ? 1 : opacity}
          />
          <ObjectGraphic
            x={objectPos.x}
            y={objectPos.y}
            opacity={opacity}
            selected={selected}
          />
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={"white"}
            fillOpacity={selected ? 0.025 : 0}
          />
        </g>
      </g>
    </>
  );
};
