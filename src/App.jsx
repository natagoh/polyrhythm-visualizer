import React from 'react';

import './App.css';

function App() {
  // euclidean algorithm
  // requires x > y
  const gcd = (x, y) => {
    if (x === 0) return y;
    if (y === 0) return x;
    const remainder = x % y;
    return gcd(y, remainder);
  };

  const lcd = (x, y) => (x * y) / (x > y
    ? gcd(x, y) : gcd(y, x));

  console.log(lcd(3, 2));

  return (
    <div className="container">
      <h1>Polyrhythm Visualizer</h1>
    </div>
  );
}

export default App;
