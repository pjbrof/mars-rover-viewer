import React, { useState, useContext } from "react";
import { Context } from "./store";

const ControlPanel = () => {
  const { store, dispatch } = useContext(Context);
  const { sol } = store;
  const [camera, setCamera] = useState("");
  const [solData, setSolData] = useState({});

  const handleClick = () => {
    fetch(`/api/v1/nasa/photos?sol=${sol}&camera=${camera}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "getPhotos",
          payload: data.photos,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleManifest = () => {
    fetch(`/api/v1/nasa/manifest?sol=${sol}`)
      .then((res) => res.json())
      .then((data) => setSolData(data))
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <div className="control-panel">
      <label>
        <span>Sol</span>
        <input type="text" onKeyUp={(e) => setSol(e.target.value)} />
      </label>
      <button onClick={() => handleManifest()}>Get Manifest</button>
      <label>
        <span>Camera</span>
        <select onChange={(e) => setCamera(e.target.value)}>
          <option>Please Select</option>
          {solData.cameras &&
            solData.cameras.map((value, index) => {
              return <option key={index}>{value}</option>;
            })}
        </select>
      </label>
      <button onClick={() => handleClick()}>Get Photos</button>
    </div>
  );
};

export default ControlPanel;
