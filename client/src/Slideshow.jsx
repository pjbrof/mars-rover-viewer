import React, { useContext } from "react";
import { Fade } from "react-slideshow-image";
import { Context } from "./store";

const fadeProperties = {
  duration: 10000,
  transitionDuration: 2000,
  infinite: true,
  indicators: false,
  pauseOnHover: true,
};

const Slideshow = () => {
  const { store } = useContext(Context);
  const { photos } = store;
  return (
    <div className="slide-container">
      {photos && (
        <Fade {...fadeProperties}>
          {photos.map((value) => {
            return (
              <div
                key={value.id}
                className="image-container"
                style={{ backgroundImage: `url(${value.img_src})` }}
              />
            );
          })}
        </Fade>
      )}
    </div>
  );
};

export default Slideshow;
