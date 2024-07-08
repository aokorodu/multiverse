import styles from "./DistanceInfo.module.css";
export const DistanceInfo = ({ distance, roomWidth, roomHeight }) => {
  const mystyle = {
    fontSize: "10px",
  };

  const w = roomWidth / 10;
  const h = roomHeight / 10;
  return (
    <>
      <div className={styles.mainText}>
        Perceived distance to reflection:{" "}
        <span className={styles.infoText}>{Math.round(distance / 10)}'</span>
      </div>
      <div style={mystyle}>{`* Room dimensions: ${w}' x ${h}'`}</div>
    </>
  );
};
