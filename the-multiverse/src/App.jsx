import { useState, useEffect } from "react";
import "./App.css";
import TheScene from "./TheScene";
import Intro from "./Intro";
import Button from "@mui/material/Button";
import { Slider } from "@mui/material";
import { SettingsSlider } from "./components/SettingsSlider";

function App() {
  useEffect(() => {}, []);

  const [page, setPage] = useState(0);
  const [reflections, setReflections] = useState(2);
  const [roomWidth, setRoomWidth] = useState(200);
  const [roomHeight, setRoomHeight] = useState(200);
  const changePage = () => {
    let newPage = 0;
    switch (page) {
      case 0:
        newPage = 1;
        break;
      case 1:
        newPage = 2;
        break;
      case 2:
        newPage = 1;
        break;

      default:
        newPage = 1;
    }

    setPage(newPage);
  };

  const getButtonText = () => {
    let str = "";
    switch (page) {
      case 0:
        str = "BEGIN >";
        break;
      case 1:
        str = "SETTINGS >";
        break;
      case 2:
        str = "< BACK";
        break;

      default:
        str = "BEGIN";
    }

    return str;
  };

  return (
    <>
      <div id="everything">
        {page == 0 && <Intro />}
        {page == 1 && (
          <TheScene
            numOfReflections={reflections}
            roomWidth={roomWidth}
            roomHeight={roomHeight}
          />
        )}
        {page == 2 && (
          <>
            <div id="settingsHolder">
              <SettingsSlider
                label={"number of reflections"}
                val={reflections}
                min={1}
                max={20}
                callback={setReflections}
              />

              <SettingsSlider
                label={"room width"}
                val={roomWidth}
                min={50}
                max={300}
                callback={setRoomWidth}
              />
              {/* <Slider
                aria-label="room width"
                defaultValue={roomWidth}
                step={1}
                marks
                min={50}
                max={300}
                valueLabelDisplay="auto"
                onChange={(e) => {
                  const val = e.target.value;
                  setRoomWidth(val);
                }}
              /> */}

              <SettingsSlider
                label={"room height"}
                val={roomHeight}
                min={50}
                max={300}
                callback={setRoomHeight}
              />
              {/* <Slider
                aria-label="room height"
                defaultValue={roomHeight}
                step={1}
                marks
                min={50}
                max={300}
                valueLabelDisplay="auto"
                onChange={(e) => {
                  const val = e.target.value;
                  setRoomHeight(val);
                }}
              /> */}
            </div>
          </>
        )}
        <Button variant="outlined" onClick={changePage}>
          <span>{getButtonText()}</span>
        </Button>
      </div>
    </>
  );
}

export default App;
