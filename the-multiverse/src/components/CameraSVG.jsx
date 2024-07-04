import styles from "./TheThing.module.css";

export const CameraSVG = ({ x, y, r = 10, mouseDown }) => {
  return (
    <>
      <g className={styles.thing}>
        <circle
          cx={x}
          cy={y}
          r={r}
          fill={"white"}
          fillOpacity={1}
          stroke={"white"}
          onMouseDown={() => {
            mouseDown("camera");
          }}
        />
        <circle
          cx={x}
          cy={y}
          r={r * 0.7}
          fill={"cyan"}
          stroke={"black"}
          strokeWidth={1}
          onMouseDown={() => {
            mouseDown("camera");
          }}
        />
        <circle
          cx={x}
          cy={y}
          r={r * 0.25}
          fill={"black"}
          stroke={"black"}
          strokeWidth={1}
          onMouseDown={() => {
            mouseDown("camera");
          }}
        />
        <circle
          cx={x}
          cy={y}
          r={r}
          fill={"white"}
          fillOpacity={0}
          stroke={"white"}
          onMouseDown={() => {
            mouseDown("camera");
          }}
        />
      </g>
    </>
  );
};
