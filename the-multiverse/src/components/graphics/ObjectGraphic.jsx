export const ObjectGraphic = ({ x, y, opacity = 1 }) => {
  return (
    <circle
      cx={x}
      cy={y}
      r={10}
      fill={"red"}
      stroke={"black"}
      opacity={opacity}
    />
  );
};
