export const TheCamera = ({ x, y, r = 10, mouseDown }) => {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={"white"}
        fillOpacity={1}
        stroke={"black"}
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
        stroke={"black"}
        onMouseDown={() => {
          mouseDown("camera");
        }}
      />
    </>
  );
};
