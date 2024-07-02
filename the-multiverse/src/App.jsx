import { useState, useEffect } from "react";
import "./App.css";
import TheScene from "./TheScene";
import Intro from "./Intro";

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <div id="holder">
        <Intro />
        {/* <TheScene /> */}
      </div>
    </>
  );
}

export default App;
