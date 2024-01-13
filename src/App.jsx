import React, { useState } from "react";
import Grid from "./components/Grid";
import PlayButton from "./components/PlayButton";

import "./App.css";

export default function App() {
  const [animate, setAnimate] = useState(false);

  const playButtonOnClick = () => {
    setAnimate(!animate);
  };

  return (
    <div className="container">
      <div className="title">Polyrhythm Visualizer</div>
      <Grid right={4} left={5} animate={animate} />
      <PlayButton onClick={playButtonOnClick} />
    </div>
  );
}
