export const AngleGraphic = ({ point, angle }) => {
  return (
    <>
      <g
        transform={`translate(${Math.round(point.x)}, ${Math.round(point.y)})`}
      >
        <text
          transform="scale(1 -1)"
          fontSize={10}
          fontWeight={900}
          x={30}
          y={7}
          fill="white"
          stroke={"none"}
          textAnchor="middle"
          dominantBaseline={"hanging"}
        >{`${angle}°`}</text>
        <text
          transform="scale(1 -1)"
          fontSize={10}
          fontWeight={900}
          x={-30}
          y={7}
          fill="white"
          stroke={"none"}
          textAnchor="middle"
          dominantBaseline={"hanging"}
        >{`${angle}°`}</text>
        <circle
          transform={`scale(1 -1)`}
          cx="0"
          cy="0"
          r="20"
          fill="none"
          stroke="#CCC"
          strokeWidth="3"
          strokeDasharray={`${angle} ${360 - angle}`}
          pathLength="360"
        />
        <circle
          transform={`scale(-1 -1)`}
          cx="0"
          cy="0"
          r="20"
          fill="none"
          stroke="#CCC"
          strokeWidth="3"
          strokeDasharray={`${angle} ${360 - angle}`}
          pathLength="360"
        />
      </g>
    </>
  );
};
