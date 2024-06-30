import { ObjectGraphic } from "./graphics/ObjectGraphic";

export const TheThing = ({ x, y, r = 20, mouseDown }) => {
  return (
    <>
      {/* <circle
        onMouseDown={() => {
          mouseDown("thing");
        }}
        cx={x}
        cy={y}
        r={r}
        fill={"red"}
        stroke={"black"}
      /> */}
      <g
        onMouseDown={() => {
          mouseDown("thing");
        }}
      >
        <ObjectGraphic x={x} y={y} opacity={1} />
      </g>
    </>
  );
};
