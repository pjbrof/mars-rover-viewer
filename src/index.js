import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { StateProvider } from "./store.js";

import Slideshow from "./Slideshow/index.jsx";
import ControlPanel from "./ControlPanel/index.jsx";

const App = () => {
  return (
    <>
      <StateProvider>
        <Slideshow />
        <ControlPanel />
      </StateProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
