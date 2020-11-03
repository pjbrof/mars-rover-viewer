import React, { useContext } from "react";
import { Fade } from "react-slideshow-image";
import { store } from "../store";

import "./Slideshow.css";

const fadeProperties = {
  duration: 10000,
  transitionDuration: 2000,
  infinite: true,
  indicators: false,
};

const Slideshow = () => {
  const nasa = useContext(store);
  return (
    <div className="slide-container">
      {nasa.state.photos && (
        <Fade {...fadeProperties}>
          {nasa.state.photos.map((value, index) => {
            console.log(value.img_src);
            return (
              <div key={value.id} className="image-container">
                <h2 className="sol">Sol {index + 1}</h2>
                <img src={value.img_src} draggable="false" />
              </div>
            );
          })}
        </Fade>
      )}
    </div>
  );
};

export default Slideshow;
