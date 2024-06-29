export const CameraGraphic = ({ x, y, opacity = 1 }) => {
  return (
    <circle
      cx={x}
      cy={y}
      r={10}
      fill={"white"}
      stroke={"black"}
      opacity={opacity}
    />
  );
};
