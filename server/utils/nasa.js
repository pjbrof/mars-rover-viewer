import "dotenv/config";
import fetch from "node-fetch";

export const getManifest = async () => {
  try {
    return await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=${process.env.NASA_APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
};

export const getPhotos = async (sol, camera) => {
  try {
    return await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${process.env.NASA_APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
};

export const getLatestWeather = async () => {
  try {
    return await fetch(
      `https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
};
