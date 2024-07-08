import { useRef, useState } from "react";
import styles from "./Intro.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "@mui/material/Button";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// scenes
import { OpeningScene } from "./IntroScenes/OpeningScene";
import { VirtualDistScene } from "./IntroScenes/VirtualDistScene";
import { MirrorReflectionScene } from "./IntroScenes/MirrorReflectionScene";
import { ObserverMoveScene } from "./IntroScenes/ObserverMoveScene";
import { ShrunkScene } from "./IntroScenes/ShrunkScene";
import { TitleScene } from "./IntroScenes/TitleScene";

const Intro = ({ completedCallback }) => {
  const stage = useRef(null);
  const sceneRefs = useRef([]);
  const [sceneNum, setSceneNum] = useState(0);
  const finished = completedCallback;

  const addToScenes = (el) => {
    if (el && !sceneRefs.current.includes(el)) {
      sceneRefs.current.push(el);
    }
  };

  const nextPage = () => {
    const val = sceneNum + 1;

    setSceneNum((currentNum) => {
      return currentNum + 1;
    });

    if (val == sceneRefs.current.length - 1) {
      finished(0);
    }
  };

  const prevPage = () => {
    setSceneNum((currentNum) => {
      return currentNum - 1;
    });
  };

  const showPage = () => {
    sceneRefs.current.forEach((scene, index) => {
      if (sceneNum == index) {
        gsap.to(scene, {
          opacity: 1,
        });
      } else {
        gsap.to(scene, {
          opacity: 0,
        });
      }
    });
  };

  useGSAP(() => {
    showPage();
  }, [sceneNum]);

  return (
    <>
      <div className={styles.introHolder}>
        <Button
          variant="outlined"
          onClick={prevPage}
          disabled={sceneNum == 0 ? true : false}
          startIcon={<NavigateBeforeIcon />}
        >
          prev
        </Button>

        <svg ref={stage} width={"100%"} height={"100%"} viewBox={`0 0 800 610`}>
          <g ref={addToScenes} id="title-scene">
            <TitleScene />
          </g>
          <g ref={addToScenes} id="opening-scene" opacity={0}>
            <OpeningScene active={sceneNum == 1} />
          </g>
          <g ref={addToScenes} id="virtual-distance-scene" opacity={0}>
            <VirtualDistScene />
          </g>
          <g ref={addToScenes} id="mirror-reflection-scene" opacity={0}>
            <MirrorReflectionScene />
          </g>
          <g ref={addToScenes} id="observer-move-scene" opacity={0}>
            <ObserverMoveScene />
          </g>
          <g ref={addToScenes} id="shrunk-scene" opacity={0}>
            <ShrunkScene />
          </g>
        </svg>
        {
          <Button
            variant="outlined"
            onClick={nextPage}
            disabled={sceneNum == sceneRefs.current.length - 1 ? true : false}
            endIcon={<NavigateNextIcon color={"secondary"} />}
          >
            next
          </Button>
        }
      </div>
    </>
  );
};

export default Intro;
