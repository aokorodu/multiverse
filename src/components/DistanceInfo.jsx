export const DistanceInfo = ({ distance, roomWidth, roomHeight }) => {
  const mystyle = {
    fontSize: "10px",
  };

  const w = roomWidth / 10;
  const h = roomHeight / 10;
  return (
    <>
      <div>Perceived distance to reflection: {Math.round(distance / 10)}'</div>
      <div style={mystyle}>{`* Room dimensions: ${w}' x ${h}`}</div>
    </>
  );
};
