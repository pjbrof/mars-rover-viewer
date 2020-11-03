import React, { useState, useRef, useContext } from "react";
import { store } from "../store";
import axios from "axios";

import "./ControlPanel.css";

const ControlPanel = () => {
  const [camera, setCamera] = useState([]);
  const solInput = useRef(null);
  const cameraInput = useRef(null);
  const my = useContext(store);

  const { dispatch } = my;

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3000/api/v1/nasa/photos?sol=${solInput.current.value}&camera=${cameraInput.current.value}`
      )
      .then((res) => {
        dispatch({
          type: "action description",
          payload: res.data.photos,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleManifest = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3000/api/v1/nasa/manifest?sol=${solInput.current.value}`
      )
      .then((res) => {
        setCamera(res.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  console.log(my);
  return (
    <div className="control-panel">
      <label>Sol</label>
      <br />
      <input type="text" ref={solInput} />
      <br />
      <br />
      <label>Camera</label>
      <br />
      <select ref={cameraInput}>
        <option>Please Select</option>
        {camera.cameras &&
          camera.cameras.map((value, index) => {
            return <option key={index}>{value}</option>;
          })}
      </select>
      <br />
      <br />
      <button onClick={(e) => handleClick(e)}>Get Photos</button>
      <br />
      <br />
      <button onClick={(e) => handleManifest(e)}>Get Manifest</button>
    </div>
  );
};

export default ControlPanel;
