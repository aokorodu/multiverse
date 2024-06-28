export const TheCamera = ({ x, y, r = 10, mouseDown }) => {
  return (
    <>
      <g
        onMouseDown={() => {
          mouseDown("camera");
        }}
      >
        <circle cx={x} cy={y} r={r} fill={"white"} stroke={"black"} />
        <circle cx={x} cy={y} r={r / 2} fill={"black"} stroke={"none"} />
      </g>
    </>
  );
};
