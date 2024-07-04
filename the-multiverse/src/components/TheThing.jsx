import { ObjectGraphic } from "./graphics/ObjectGraphic";
import styles from "./TheThing.module.css";
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
        {/* <ObjectGraphic x={x} y={y} opacity={1} /> */}
        <polygon
          className={styles.thing}
          points={`${x},${y - r} ${x + r},${y + r} ${x - r},${y + r} `}
          fill={"red"}
          stroke={"red"}
          strokeLinejoin="round"
        />
      </g>
    </>
  );
};
