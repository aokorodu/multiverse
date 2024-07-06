import { useState, useEffect } from "react";
import "./App.css";
import TheScene from "./components/TheScene";
import Intro from "./components/Intro";
import Button from "@mui/material/Button";
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
              <h2>SETTINGS</h2>
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
              <SettingsSlider
                label={"room length"}
                val={roomHeight}
                min={50}
                max={300}
                callback={setRoomHeight}
              />
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
