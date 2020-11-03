require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const cron = require("node-cron");
const cors = require("cors");
const port = process.env.PORT || 3000;

const { getManifest } = require("./src/utils/nasa");
const nasa = require("./src/routes/nasa");

cron.schedule("0 4 * * *", () => {
  const d = new Date();
  console.log("Fetched manifest at ", d.toLocaleString());
  getManifest()
    .then((res) => {
      setManifest(res.data);
    })
    .catch((err) => {
      console.error("Error fetching manifest", err);
    });
});

const setManifest = (json) => {
  fs.writeFile("manifest.json", JSON.stringify(json), "utf8", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

app.use("/", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/api/v1/nasa", nasa);

app.listen(port, () => console.log(`Listening at ${port}`));

//GET https: //api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
