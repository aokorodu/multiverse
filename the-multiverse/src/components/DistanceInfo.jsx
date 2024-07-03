export const DistanceInfo = ({ distance }) => {
  const mystyle = {
    fontSize: "10px",
  };
  return (
    <>
      <div>Perceived distance to reflection: {Math.round(distance / 10)}'</div>
      <div style={mystyle}>* Room dimensions: 20' x 10'</div>
    </>
  );
};
