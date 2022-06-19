import fs from "fs";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { getPhotos } from "../utils/nasa.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/photos", async (req, res) => {
  try {
    const data = await getPhotos(req.query.sol, req.query.camera);
    res.json(data.photos);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// TODO if req is higher than max sol OR if sol DNE
router.get("/manifest", async (req, res) => {
  try {
    const manifestFile = fs.readFileSync(
      path.join(__dirname, "../manifest.json"),
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

router.get("/generalInfo", async (_req, res) => {
  try {
    const manifestFile = fs.readFileSync(
      path.join(__dirname, "../manifest.json"),
      "utf8",
      (err, data) => {
        if (err) return console.error(err);
        return data;
      }
    );

    const manifestJSON = JSON.parse(manifestFile);
    delete manifestJSON.photo_manifest.photos;
    res.json(manifestJSON.photo_manifest);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/weather", async (_req, res) => {
  try {
    const weatherFile = fs.readFileSync(
      path.join(__dirname, "../weather.json"),
      "utf8",
      (err, data) => {
        if (err) return console.error(err);
        return data;
      }
    );

    const weatherJSON = JSON.parse(weatherFile);
    res.json(weatherJSON.soles[0]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;
