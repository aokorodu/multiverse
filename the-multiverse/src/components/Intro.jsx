import { useRef, useState } from "react";
import styles from "./Intro.module.css";

const Intro = () => {
  const stage = useRef(null);

  return (
    <>
      <div className={styles.introHolder}>
        <svg
          ref={stage}
          width={"100%"}
          height={"100%"}
          viewBox={`0 0 500 500`}
        ></svg>
      </div>
    </>
  );
};

export default Intro;
