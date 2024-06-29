export const TheCamera = ({ x, y, r = 10, mouseDown }) => {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={"white"}
        stroke={"black"}
        onMouseDown={() => {
          mouseDown("camera");
        }}
      />
    </>
  );
};
