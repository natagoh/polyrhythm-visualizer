import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import './fonts/Source_Code_Pro/SourceCodePro-Medium.ttf';
import './fonts/Source_Code_Pro/SourceCodePro-Light.ttf';
import './fonts/Source_Code_Pro/SourceCodePro-Bold.ttf';
import './fonts/Source_Code_Pro/SourceCodePro-Regular.ttf';
import './fonts/Source_Code_Pro/SourceCodePro-SemiBold.ttf';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
