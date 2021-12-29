"use strict";
const scraper = require("./scraper");
const fs = require("fs");
const path = "data.json";

try {
  if (fs.existsSync(path)) {
    console.log("the file already exists");
  } else {
    console.log("scraping data...");
    scraper.web();
  }
} catch (err) {
  console.log(err);
}
