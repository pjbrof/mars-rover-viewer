const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const { getPhotos } = require("../utils/nasa");

router.get("/photos", async (req, res) => {
  try {
    const photos = await getPhotos(req.query.sol, req.query.camera);
    res.json(photos.data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// TODO if req is higher than max sol OR if sol DNE
router.get("/manifest", async (req, res) => {
  try {
    const manifestFile = fs.readFileSync(
      path.join(__dirname, "../../manifest.json"),
      "utf8",
      (err, data) => {
        if (err) return console.error(err);
        return data;
      }
    );

    const manifestJSON = JSON.parse(manifestFile);
    const solManifest = manifestJSON.photo_manifest.photos.find(
      (value) => value.sol === parseInt(req.query.sol)
    );
    res.json(solManifest);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
