import { ObjectGraphic } from "./graphics/ObjectGraphic";
import styles from "./TheThing.module.css";
export const TheThing = ({ x, y, r = 20, mouseDown }) => {
  return (
    <>
      <g
        onMouseDown={() => {
          mouseDown("thing");
        }}
      >
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
