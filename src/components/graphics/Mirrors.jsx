export const Mirrors = ({ width, height, opacity = 1 }) => {
  const mirrorWidth = 2;
  return (
    <>
      <line
        x1={0}
        y1={mirrorWidth / 2}
        x2={width}
        y2={mirrorWidth / 2}
        stroke={"lightblue"}
        strokeWidth={mirrorWidth}
        strokeOpacity={opacity}
      />
      <line
        x1={0}
        y1={height - mirrorWidth / 2}
        x2={width}
        y2={height - mirrorWidth / 2}
        stroke={"lightblue"}
        strokeWidth={mirrorWidth}
        strokeOpacity={opacity}
      />
    </>
  );
};
