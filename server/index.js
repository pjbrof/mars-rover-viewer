import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import express from "express";
import cron from "node-cron";
import cors from "cors";
import { fileURLToPath } from "url";
import { getManifest, getLatestWeather } from "./utils/nasa.js";
import nasa from "./routes/nasa.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const port = process.env.PORT || 3000;

const app = express();

cron.schedule("0 4 * * *", () => {
  const d = new Date();
  console.log("Fetched manifest at ", d.toLocaleString());
  getManifest()
    .then((res) => {
      setManifest(res);
    })
    .catch((err) => {
      console.error("Error fetching manifest", err);
    });

  console.log("Fetched weather at ", d.toLocaleString());
  getLatestWeather()
    .then((res) => {
      setWeather(res);
    })
    .catch((err) => {
      console.error("Error fetching weather", err);
    });
});

const setManifest = (json) => {
  fs.writeFile("manifest.json", JSON.stringify(json), "utf8", (err) => {
    if (err) throw err;
    console.log("The manifest file has been saved!");
  });
};

const setWeather = (json) => {
  fs.writeFile("weather.json", JSON.stringify(json), "utf8", (err) => {
    if (err) throw err;
    console.log("The weather file has been saved!");
  });
};

app.use(cors());
app.use("/api/v1/nasa", nasa);

app.listen(port, () => console.log(`Listening at ${port}`));
