import React from 'react';
import Grid from './Grid';

import './App.css';

export default function App() {
  return (
    <div className="container">
      <div className="title">Polyrhythm Visualizer</div>
      <Grid right={4} left={3} />
    </div>
  );
}
