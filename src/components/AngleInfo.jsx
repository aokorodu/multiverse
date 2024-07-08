import styles from "./AngleInfo.module.css";
export const AngleInfo = ({ degrees }) => {
  return (
    <div className={styles.mainText}>
      Angle of reflection:{" "}
      <span className={styles.degreesText}>{degrees}°</span>
    </div>
  );
};
