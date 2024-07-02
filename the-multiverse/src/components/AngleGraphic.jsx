export const AngleGraphic = ({ point, angle }) => {
  return (
    <>
      <g
        transform={`translate(${Math.round(point.x)}, ${Math.round(point.y)})`}
      >
        <text
          transform="scale(1 -1)"
          fontSize={10}
          x={20}
          y={5}
          fill="white"
          stroke={"none"}
          textAnchor="middle"
          dominantBaseline={"hanging"}
        >{`${angle}`}</text>
      </g>
    </>
  );
};
