export const ReflectionLine = ({ numberOfPoints, pointString, color }) => {
  const durationVal = numberOfPoints + 1;
  const dur = `${durationVal}s`;
  const r = 4;
  const inverted = numberOfPoints % 2 != 0;

  const upsideDown = `${-r},${-r} ${r},${-r} ${0},${r}`;
  const normal = `${0},${-r} ${r},${r} ${-r},${r}`;
  const str = inverted ? upsideDown : normal;

  const getAnimatedCircles = () => {
    const arr = [];
    for (let i = 0; i < numberOfPoints; i++) {
      arr.push(
        <polygon points={str} fill={"red"}>
          <animateMotion
            dur={dur}
            begin={`-${i}s`}
            repeatCount={"indefinite"}
            path={pointString}
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode={"linear"}
          />
        </polygon>
      );
    }

    return arr;
  };
  return (
    <>
      <path d={pointString} stroke={color} fill="none" strokeWidth={1} />
      {getAnimatedCircles()}
    </>
  );
};
