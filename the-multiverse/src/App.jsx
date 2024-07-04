import { useState, useEffect } from "react";
import "./App.css";
import TheScene from "./TheScene";
import Intro from "./Intro";
import Button from "@mui/material/Button";
import { Slider } from "@mui/material";

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
            <Slider
              aria-label="number of reflections"
              defaultValue={reflections}
              step={1}
              marks
              min={1}
              max={20}
              valueLabelDisplay="auto"
              onChange={(e) => {
                const val = e.target.value;
                setReflections(val);
              }}
            />
            <Slider
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
            />
            <Slider
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
            />
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
