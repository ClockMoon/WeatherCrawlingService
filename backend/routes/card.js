const express = require("express");
const router = express.Router();
const crawler = require("../utils/crawler");
const WeatherCrawler = require("../utils/excelMaker");
const db = require("../models");
const passport = require("passport");

router.get("/", (req, res) => {
  return res.send("d");
});

router.post("/", async (req, res) => {
  try {
    const {
      location,
      averageTemperture,
      lowestTemperture,
      highestTemperture,
      rainfall,
      snowfall,
      averageWindSpeed,
      huminity,
      sunnyHour,
      cloudy,
      weather,
      startYear,
      endYear
    } = req.body.newCard;
    let { user } = req.body.newCard;
    let newCard = null;
    if (user) {
      user = await db.User.findOne({
        where: {
          userId: user.userId
        }
      });
      newCard = await db.Card.create({
        location,
        averageTemperture,
        lowestTemperture,
        highestTemperture,
        rainfall,
        snowfall,
        averageWindSpeed,
        huminity,
        sunnyHour,
        cloudy,
        weather,
        startYear,
        endYear,
        UserId: user.id
      });
    } else {
      newCard = await db.Card.create({
        location,
        averageTemperture,
        lowestTemperture,
        highestTemperture,
        rainfall,
        snowfall,
        averageWindSpeed,
        huminity,
        sunnyHour,
        cloudy,
        weather,
        startYear,
        endYear,
        user: null
      });
    }

    return res.status(200).json(newCard);
  } catch (e) {
    console.log(e);
    res.status(403).send("뭔가 에러가 발생");
  }

  return res.status(200);
});

router.delete("/", (req, res) => {});

router.put("/", (req, res) => {});

router.get("/excel", (req, res) => {});

router.post("/excel", (req, res) => {
  makeExcelFile(req, res);
});

let crawlerCase = null;

function makeExcelFile(req, res) {
  crawlerCase = new WeatherCrawler();
  const cards = req.body.data.fileData;
  processArray(cards, res);
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
