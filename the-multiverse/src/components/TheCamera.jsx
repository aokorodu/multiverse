export const TheCamera = ({ x, y, r = 10 }) => {
  return (
    <>
      {/* <circle
          onMouseDown={mouseDown}
          cx={x}
          cy={y}
          r={r}
          fill={"red"}
          stroke={"black"}
        /> */}
      <circle cx={x} cy={y} r={r} fill={"white"} stroke={"black"} />
      <circle cx={x} cy={y} r={r / 2} fill={"black"} stroke={"none"} />
    </>
  );
};
