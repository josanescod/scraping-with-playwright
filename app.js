"use strict";
const scraper = require("./scraper");
const fs = require("fs");
const path = "data.json";

try {
  if (fs.existsSync(path)) {
    console.log("the file already exists");
  } else {
    console.log("the file does not exist");
    scraper.web();
  }
} catch (err) {
  console.log(err);
}
