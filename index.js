const express = require("express");
const crawler = require("./utils/crawler");
const app = express();
const WeatherCrawler = require("./utils/excelMaker");

let crawlerCase = null;

app.use(express.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.post("/crawler", async (req, res) => {
  const requestData = req.body;
  const answer = await crawler.crawlingWeatherData(requestData[0]);

  res.send(answer);
});
app.get("/excel", async (req, res) => {
  makeReport(req, res);
});
app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

async function makeReport(req, res) {
  crawlerCase = new WeatherCrawler();
  const answer = await crawler.crawlingWeatherData({
    locationCode: 108,
    year: 2018,
    factorCode: 7
  });
  crawlerCase
    .inputOneYearFactorData(answer.factors, 108, 2018, 7)
    .write("MyWorkBook.xlsx", res);
}
