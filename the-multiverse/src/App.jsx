import { useState, useEffect } from "react";
import "./App.css";
import TheScene from "./TheScene";
import Intro from "./Intro";
import Button from "@mui/material/Button";

function App() {
  useEffect(() => {}, []);

  const [page, setPage] = useState(0);
  const changePage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div id="holder">
        {page == 0 && <Intro />}
        {page == 1 && <TheScene />}
        {page == 0 && (
          <Button variant="text" onClick={changePage}>
            BEGIN
          </Button>
        )}
      </div>
    </>
  );
}

export default App;
