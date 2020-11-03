require("dotenv").config();
const axios = require("axios");

const getManifest = async () => {
  try {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=${process.env.NASA_APIKEY}`
      )
      .then((res) => res)
      .then((data) => data)
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    throw new Error(err);
  }
};

const getPhotos = async (sol, camera) => {
  try {
    return await axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${process.env.NASA_APIKEY}`
      )
      .then((res) => res)
      .then((data) => data)
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getManifest, getPhotos };
