import styles from "./VirtualDistanceScene.module.css";
import { AngleGraphic } from "../AngleGraphic";
export const ObserverMoveScene = () => {
  const demoPoint = { x: 165, y: -305 };
  return (
    <>
      {" "}
      <g transform="scale(1 -1)">
        <AngleGraphic angle={60} point={demoPoint} />
      </g>
      <g id="line_to_reflection" opacity="0.6">
        <line
          id="Line 6"
          x1="111.5"
          y1="177"
          x2="111.5"
          y2="428"
          stroke="white"
          stroke-opacity="0.7"
        />
        <path
          id="Line 7"
          d="M112.412 176.716L248.001 500.5"
          stroke="white"
          stroke-opacity="0.7"
        />
      </g>
      <g id="line_to_mirror">
        <path id="Line 8" d="M111.582 426.724L166 306" stroke="#FF0000" />
        <path id="Line 9" d="M241.501 483.999L166 305" stroke="#FF0000" />
      </g>
      <g id="shrunk_scene_1">
        <g id="mirror">
          <line
            id="Line 5"
            y1="300"
            x2="400"
            y2="300"
            stroke="#ADD8E6"
            stroke-width="10"
          />
        </g>
        <g id="mirror_2">
          <line
            id="Line 5_2"
            y1="595.001"
            x2="400"
            y2="595.001"
            stroke="#ADD8E6"
            stroke-width="10"
          />
        </g>
        <g id="objects">
          <g id="observer">
            <g id="Ellipse 51">
              <circle cx="248" cy="503" r="25" fill="#FCFCFC" />
              <circle cx="248" cy="503" r="25" fill="#FCFCFC" />
              <circle cx="248" cy="503" r="25" fill="#FCFCFC" />
            </g>
            <circle
              id="Ellipse 52"
              cx="248"
              cy="503"
              r="17"
              fill="#00FFFF"
              stroke="black"
            />
            <circle id="Ellipse 53" cx="248" cy="503" r="10" fill="black" />
          </g>
          <g id="object">
            <path
              id="object_2"
              d="M112.035 471.023C111.575 471.82 110.425 471.82 109.965 471.023L86.1619 429.794C85.7019 428.998 86.2769 428.002 87.1968 428.002L134.803 428.002C135.723 428.002 136.298 428.998 135.838 429.794L112.035 471.023Z"
              fill="#F10202"
            />
          </g>
        </g>
      </g>
      <g id="object_reflection" opacity="0.8">
        <path
          id="object_3"
          d="M109.965 133.597C110.425 132.801 111.575 132.801 112.035 133.597L135.838 174.826C136.298 175.622 135.723 176.618 134.803 176.618L87.1968 176.618C86.2769 176.618 85.7019 175.622 86.1619 174.826L109.965 133.597Z"
          fill="#F10202"
        />
      </g>
      <g id="mirror_3">
        <line
          id="Line 5_3"
          y1="5"
          x2="400"
          y2="5"
          stroke="#ADD8E6"
          stroke-width="10"
        />
      </g>
      <g id="text">
        <foreignObject x="440" y="230" width="340" height="300">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className={styles.instructionText}
          >
            We can see how the percieved distance and the angle of reflection
            change when we drag and move either the object or the observer
          </div>
        </foreignObject>
      </g>
    </>
  );
};
