export const ObjectGraphic = ({ x, y, opacity = 1, selected = false }) => {
  const r = 10;
  return (
    <>
      <polygon
        points={`${x},${y - r} ${x + r},${y + r} ${x - r},${y + r} `}
        fill={"red"}
        stroke={selected ? "white" : "none"}
        strokeWidth={1}
        strokeLinejoin="round"
        opacity={opacity}
      />
    </>
  );
};
