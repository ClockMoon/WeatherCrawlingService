const express = require("express");
const router = express.Router();
const crawler = require("../utils/crawler");
const WeatherCrawler = require("../utils/excelMaker");

router.get("/", (req, res) => {});

router.post("/", (req, res) => {});

router.delete("/", (req, res) => {});

router.put("/", (req, res) => {});

router.post("/excel", (req, res) => {
  makeExcelFile(req, res);
});

let crawlerCase = null;

function makeExcelFile(req, res) {
  crawlerCase = new WeatherCrawler();
  const dummy = [
    {
      locationCode: 108,
      year: 2016,
      factorCode: 7
    },
    {
      locationCode: 108,
      year: 2016,
      factorCode: 7
    },
    {
      locationCode: 108,
      year: 2016,
      factorCode: 7
    },
    {
      locationCode: 108,
      year: 2016,
      factorCode: 7
    }
  ];
  processArray(dummy, res);
}

async function processFunc(information) {
  const result = await crawler.crawlingWeatherData(information);
  return {
    result,
    information
  };
}

async function processArray(informations, res) {
  const promiseObj = informations.map(processFunc);
  await Promise.all(promiseObj).then(promiseReturnData => {
    promiseReturnData.map(target => {
      crawlerCase.inputOneYearFactorData(
        target.result.factors,
        target.information.locationCode,
        target.information.year,
        target.information.factorCode
      );
    });
    crawlerCase.getWorkBook().write("Weather.xlsx", res);
  });
}

module.exports = router;
