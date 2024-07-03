import { useState, useEffect } from "react";
import "./App.css";
import TheScene from "./TheScene";
import Intro from "./Intro";
import Button from "@mui/material/Button";
import { Slider } from "@mui/material";

function App() {
  useEffect(() => {}, []);

  const [page, setPage] = useState(0);
  const [reflections, setReflections] = useState(1);
  const changePage = () => {
    const pg = page == 0 ? 1 : 0;
    setPage(pg);
  };

  return (
    <>
      <div id="everything">
        {page == 0 && <Intro />}
        {page == 0 && (
          <Slider
            aria-label="Small steps"
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
        )}

        {page == 1 && <TheScene numOfReflections={reflections} />}
        {true && (
          <Button variant="text" onClick={changePage}>
            <span>{page == 0 ? "BEGIN >" : "< SETTINGS"}</span>
          </Button>
        )}
      </div>
    </>
  );
}

export default App;
