import React from 'react';
import ReactDOM from 'react-dom';


import Vdeo from '../src/component/Vdeo.js';


function App() {
  return (
    <div>
      <Vdeo />
    </div>
  );
}
ReactDOM.render(<App/>,document.querySelector("#root"))