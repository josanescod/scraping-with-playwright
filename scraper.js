"use strict";
const playwright = require("playwright");
const fs = require("fs");

async function web() {
  const browser = await playwright.chromium.launch({
    headless: false,
  });
  const page = await browser.newPage({
    bypassCSP: true, // This is needed to enable JavaScript execution on GitHub.
  });
  await page.goto("https://josanescod.github.io/search-bar-uoc/");

  await page.click("input");

  await page.keyboard.type("a");

  await page.screenshot({
    path: "screenshot.png",
    fullPage: true,
  });

  const subjects = await page.$$eval("tr", (dataSubjects) => {
    return dataSubjects
      .filter((tr) => tr.rowIndex <= 5) //only scrap 5 elements from a set
      .map((subject) => {
        const title = subject.querySelector(".subject").textContent;
        const whatsapp = subject.querySelector(
          ".level-right > .whatsapp-color"
        ).href;
        const telegram = subject.querySelector(
          ".level-right > .telegram-color"
        ).href;

        return {
          title: title.trim(),
          whatsapp: whatsapp.trim(),
          telegram: telegram.trim(),
        };
      });
  });

  console.dir(subjects);

  //writing async data
  let data = await JSON.stringify(subjects, null, 2);
  await fs.promises.writeFile("data.json", data);

  await browser.close();
}

module.exports.web = web;
