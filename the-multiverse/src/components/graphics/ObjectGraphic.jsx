export const ObjectGraphic = ({ x, y, opacity = 1 }) => {
  const r = 10;
  return (
    <>
      <polygon
        points={`${x},${y - r} ${x + r},${y + r} ${x - r},${y + r} `}
        fill={"red"}
        stroke={"black"}
        opacity={opacity}
      />
    </>
  );
};
