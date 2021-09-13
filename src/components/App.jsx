import React from 'react';
import Grid from './Grid';
import PlayButton from './PlayButton';

import './App.css';

export default function App() {
  return (
    <div className="container">
      <div className="title">Polyrhythm Visualizer</div>
      <Grid right={4} left={5} />
      <PlayButton />
    </div>
  );
}
