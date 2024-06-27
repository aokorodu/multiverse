export const TheThing = ({ x, y, r = 20, mouseDown }) => {
  return (
    <>
      <circle
        onMouseDown={mouseDown}
        cx={x}
        cy={y}
        r={r}
        fill={"red"}
        stroke={"black"}
      />
    </>
  );
};
