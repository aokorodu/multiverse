export const ReflectionLine = ({ numberOfPoints, pointString, color }) => {
  const durationVal = numberOfPoints + 1;
  const dur = `${durationVal}s`;

  const getAnimatedCircles = () => {
    const arr = [];
    for (let i = 0; i < numberOfPoints; i++) {
      arr.push(
        <circle cx="0" cy="0" r="2" fill={color}>
          <animateMotion
            dur={dur}
            begin={`-${i}s`}
            repeatCount={"indefinite"}
            path={pointString}
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode={"linear"}
          />
        </circle>
      );
    }

    return arr;
  };
  return (
    <>
      <path d={pointString} stroke={color} fill="none" strokeWidth={1} />
      {getAnimatedCircles()}
      {/* <circle cx="0" cy="0" r="3" fill={color}>
        <animateMotion
          dur={dur}
          begin={"0s"}
          repeatCount={"indefinite"}
          path={pointString}
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode={"linear"}
        />
      </circle>
      <circle cx="0" cy="0" r="3" fill={color}>
        <animateMotion
          dur={dur}
          begin={`${numberOfPoints * 0.33}s`}
          repeatCount={"indefinite"}
          path={pointString}
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode={"linear"}
        />
      </circle>
      <circle cx="0" cy="0" r="3" fill={color}>
        <animateMotion
          dur={dur}
          begin={`${numberOfPoints * 0.66}s`}
          repeatCount={"indefinite"}
          path={pointString}
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode={"linear"}
        />
      </circle> */}
    </>
  );
};
