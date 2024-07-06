import { useRef, useState } from "react";
import styles from "./Intro.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Intro = () => {
  const stage = useRef(null);
  const scene_1 = useRef(null);
  const scene_2 = useRef(null);
  const scene_3 = useRef(null);
  const sceneRefs = useRef([]);
  const [sceneNum, setSceneNum] = useState(0);

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
    console.log("useGsap: ", sceneNum);
    showPage();
  }, [sceneNum]);

  return (
    <>
      <div className={styles.introHolder}>
        <button onClick={prevPage} disabled={sceneNum == 0 ? true : false}>
          prev
        </button>

        <svg ref={stage} width={"100%"} height={"100%"} viewBox={`0 0 800 610`}>
          <g id="Intro">
            <g ref={addToScenes} id="scene_1">
              <g id="observer">
                <g id="Ellipse 51">
                  <circle cx="580" cy="300" r="50" fill="#FCFCFC" />
                  <circle cx="580" cy="300" r="50" fill="#FCFCFC" />
                  <circle cx="580" cy="300" r="50" fill="#FCFCFC" />
                </g>
                <circle
                  id="Ellipse 52"
                  cx="580"
                  cy="300"
                  r="34.5"
                  fill="#00FFFF"
                  stroke="black"
                />
                <circle id="Ellipse 53" cx="580" cy="300" r="20" fill="black" />
              </g>
              <g id="object">
                <path
                  id="object_2"
                  d="M221.07 342.042C220.15 343.635 217.85 343.635 216.93 342.042L169.324 259.585C168.404 257.992 169.554 256 171.394 256L266.606 256C268.446 256 269.596 257.992 268.676 259.585L221.07 342.042Z"
                  fill="#F10202"
                />
              </g>
              <g id="mirrors">
                <g id="mirror">
                  <line
                    id="Line 5"
                    y1="5"
                    x2="800"
                    y2="5"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
                <g id="mirror_2">
                  <line
                    id="Line 5_2"
                    y1="595"
                    x2="800"
                    y2="595"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
              </g>
              <g id="descriptive_text">
                <text id="object_text" fill="white" font-size="48">
                  <tspan x="147" y="411.455">
                    object
                  </tspan>
                </text>
                <text id="observer_text" fill="white" font-size="48">
                  <tspan x="479" y="411.455">
                    observer
                  </tspan>
                </text>
                <g id="mirror_text_top">
                  <path
                    id="^"
                    d="M394.886 52.0907H396.114V53.7953H394.886V52.0907ZM386.159 64.9089L393.182 50.1816H397.818L404.841 64.9089H400.818L395.296 53.1135H395.705L390.25 64.9089H386.159Z"
                    fill="white"
                  />
                  <text id="mirror_3" fill="white" font-size="48">
                    <tspan x="328.234" y="104.455">
                      mirror
                    </tspan>
                  </text>
                </g>
                <g id="mirror_text_bottom">
                  <path
                    id="^_2"
                    d="M404.727 568.818H405.955V567.114H404.727V568.818ZM396 556L403.023 570.728H407.659L414.682 556H410.659L405.136 567.796H405.545L400.091 556H396Z"
                    fill="white"
                  />
                  <text id="mirror_4" fill="white" font-size="48">
                    <tspan x="332.234" y="544.455">
                      mirror
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            {/* <g ref={addToScenes} id="scene_2" opacity={1}>
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
                <line
                  id="Line 7"
                  x1="112.412"
                  y1="176.716"
                  x2="285.412"
                  y2="427.716"
                  stroke="white"
                  stroke-opacity="0.7"
                />
              </g>
              <g id="shrunk_scene_1">
                <g id="mirror_5">
                  <line
                    id="Line 5_3"
                    y1="300"
                    x2="400"
                    y2="300"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
                <g id="mirror_6">
                  <line
                    id="Line 5_4"
                    y1="595.001"
                    x2="400"
                    y2="595.001"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
                <g id="objects">
                  <g id="observer_2">
                    <g id="Ellipse 51_2">
                      <circle cx="297" cy="450.002" r="25" fill="#FCFCFC" />
                      <circle cx="297" cy="450.002" r="25" fill="#FCFCFC" />
                      <circle cx="297" cy="450.002" r="25" fill="#FCFCFC" />
                    </g>
                    <circle
                      id="Ellipse 52_2"
                      cx="297"
                      cy="450.002"
                      r="17"
                      fill="#00FFFF"
                      stroke="black"
                    />
                    <circle
                      id="Ellipse 53_2"
                      cx="297"
                      cy="450.002"
                      r="10"
                      fill="black"
                    />
                  </g>
                  <g id="object_3">
                    <path
                      id="object_4"
                      d="M112.035 471.023C111.575 471.82 110.425 471.82 109.965 471.023L86.1619 429.794C85.7019 428.998 86.2769 428.002 87.1968 428.002L134.803 428.002C135.723 428.002 136.298 428.998 135.838 429.794L112.035 471.023Z"
                      fill="#F10202"
                    />
                  </g>
                </g>
              </g>
              <g id="object_reflection" opacity="0.8">
                <path
                  id="object_5"
                  d="M109.965 133.597C110.425 132.801 111.575 132.801 112.035 133.597L135.838 174.826C136.298 175.622 135.723 176.618 134.803 176.618L87.1968 176.618C86.2769 176.618 85.7019 175.622 86.1619 174.826L109.965 133.597Z"
                  fill="#F10202"
                />
              </g>
              <g id="mirror_reflection">
                <line
                  id="Line 5_5"
                  y1="5"
                  x2="400"
                  y2="5"
                  stroke="#ADD8E6"
                  strokeWidth="10"
                />
              </g>
            </g> */}

            <g ref={addToScenes} id="scene_2" opacity={1}>
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
                <line
                  id="Line 7"
                  x1="112.412"
                  y1="176.716"
                  x2="285.412"
                  y2="427.716"
                  stroke="white"
                  stroke-opacity="0.7"
                />
              </g>
              <g id="line_to_mirror">
                <line
                  id="Line 8"
                  x1="111.583"
                  y1="426.724"
                  x2="195.583"
                  y2="299.724"
                  stroke="#FF0000"
                />
                <line
                  id="Line 9"
                  y1="-0.5"
                  x2="152.266"
                  y2="-0.5"
                  transform="matrix(-0.566701 -0.823924 -0.823924 0.566701 284.145 427.229)"
                  stroke="#FF0000"
                />
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
                      <circle cx="297" cy="450.002" r="25" fill="#FCFCFC" />
                      <circle cx="297" cy="450.002" r="25" fill="#FCFCFC" />
                      <circle cx="297" cy="450.002" r="25" fill="#FCFCFC" />
                    </g>
                    <circle
                      id="Ellipse 52"
                      cx="297"
                      cy="450.002"
                      r="17"
                      fill="#00FFFF"
                      stroke="black"
                    />
                    <circle
                      id="Ellipse 53"
                      cx="297"
                      cy="450.002"
                      r="10"
                      fill="black"
                    />
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
            </g>

            <g ref={addToScenes} id="scene_3" opacity={1}>
              <g id="shrunk_scene_1_2">
                <g id="mirror_7">
                  <line
                    id="Line 5_6"
                    y1="406.9"
                    x2="269.966"
                    y2="406.9"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
                <g id="mirror_8">
                  <line
                    id="Line 5_7"
                    y1="606.001"
                    x2="269.966"
                    y2="606.001"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
                <g id="objects_2">
                  <g id="observer_3">
                    <g id="Ellipse 51_3">
                      <circle
                        cx="200.449"
                        cy="509.764"
                        r="16.8729"
                        fill="#FCFCFC"
                      />
                      <circle
                        cx="200.449"
                        cy="509.764"
                        r="16.8729"
                        fill="#FCFCFC"
                      />
                      <circle
                        cx="200.449"
                        cy="509.764"
                        r="16.8729"
                        fill="#FCFCFC"
                      />
                    </g>
                    <circle
                      id="Ellipse 52_3"
                      cx="200.449"
                      cy="509.764"
                      r="11.311"
                      fill="#00FFFF"
                      stroke="black"
                    />
                    <circle
                      id="Ellipse 53_3"
                      cx="200.449"
                      cy="509.765"
                      r="6.74914"
                      fill="black"
                    />
                  </g>
                  <g id="object_6">
                    <path
                      id="object_7"
                      d="M75.6133 523.951C75.3029 524.489 74.5268 524.489 74.2164 523.951L58.1513 496.126C57.8408 495.588 58.2289 494.916 58.8497 494.916L90.98 494.916C91.6008 494.916 91.9889 495.588 91.6784 496.126L75.6133 523.951Z"
                      fill="#F10202"
                    />
                  </g>
                </g>
              </g>
              <g id="line_to_reflection_3">
                <line
                  id="Line 10"
                  x1="74.7412"
                  y1="112.236"
                  x2="75.4751"
                  y2="498.287"
                  stroke="white"
                />
                <line
                  id="Line 11"
                  x1="74.717"
                  y1="112.084"
                  x2="200.926"
                  y2="502.859"
                  stroke="white"
                />
              </g>
              <g id="line_to_mirror_3">
                <line
                  id="Line 13"
                  x1="171.23"
                  y1="411.072"
                  x2="197.552"
                  y2="493.412"
                  stroke="#FF0D0D"
                />
                <path
                  id="Line 15"
                  d="M171.107 411.122L109.337 603.913"
                  stroke="#FF0D0D"
                />
                <path
                  id="Line 16"
                  d="M75.2539 498.289L109.016 604.057"
                  stroke="#FF0D0D"
                />
              </g>
              <g id="room_reflection" opacity="0.5">
                <g id="mirror_9">
                  <line
                    id="Line 5_8"
                    y1="-5"
                    x2="269.966"
                    y2="-5"
                    transform="matrix(1 0 0 -1 0 401.776)"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
                <g id="mirror_10">
                  <line
                    id="Line 5_9"
                    y1="-5"
                    x2="269.966"
                    y2="-5"
                    transform="matrix(1 0 0 -1 0 202.676)"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
                <g id="objects_3">
                  <g id="object_8">
                    <path
                      id="object_9"
                      d="M75.6143 289.725C75.3039 289.188 74.5278 289.188 74.2173 289.725L58.1522 317.551C57.8418 318.089 58.2298 318.761 58.8507 318.761L90.9809 318.761C91.6018 318.761 91.9899 318.089 91.6794 317.551L75.6143 289.725Z"
                      fill="#F10202"
                    />
                  </g>
                </g>
              </g>
              <g id="room_reflection_2" opacity="0.5">
                <g id="mirror_11">
                  <line
                    id="Line 5_10"
                    y1="6"
                    x2="269.966"
                    y2="6"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
                <g id="mirror_12">
                  <line
                    id="Line 5_11"
                    y1="205.101"
                    x2="269.966"
                    y2="205.101"
                    stroke="#ADD8E6"
                    strokeWidth="10"
                  />
                </g>
                <g id="objects_4">
                  <g id="object_10">
                    <path
                      id="object_11"
                      d="M75.6143 123.051C75.3039 123.589 74.5278 123.589 74.2173 123.051L58.1522 95.2254C57.8418 94.6877 58.2298 94.0156 58.8507 94.0156L90.9809 94.0156C91.6018 94.0156 91.9899 94.6877 91.6794 95.2254L75.6143 123.051Z"
                      fill="#F10202"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {
          <button onClick={nextPage} disabled={sceneNum == 2 ? true : false}>
            next
          </button>
        }
      </div>
    </>
  );
};

export default Intro;
