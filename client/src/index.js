import React, { useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import { Context } from "./store.js";
import reducer from "./reducer.js";

import Slideshow from "./Slideshow.jsx";
import DisplayPanel from "./DisplayPanel.jsx";
// import ControlPanel from "./ControlPanel.jsx";

import descriptions from "../../server/sources/descriptions.json";

import "./app.css";

const initialState = {
  ...descriptions,
};

const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getWeather = async () => {
      return await fetch("/api/v1/nasa/weather")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.error(err));
    };

    const generalInfo = async () => {
      return await fetch("/api/v1/nasa/generalInfo")
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: "generalInfo",
            payload: data,
          });
        })
        .catch((err) => console.error(err));
    };

    const currentSolPhotos = async (solData) => {
      return await fetch(`/api/v1/nasa/photos?sol=${solData.sol}&camera=NAVCAM`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: "currentSolPhotos",
            payload: {
              weather: solData,
              photos: data,
            },
          });
        })
        .catch((err) => console.error(err));
    };
    generalInfo();
    getWeather().then((maxSol) => {
      currentSolPhotos(maxSol);
    });
  }, []);

  return (
    <>
      <Context.Provider value={{ store, dispatch }}>
        <Slideshow />
        <DisplayPanel />
        {/* <ControlPanel /> */}
      </Context.Provider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
