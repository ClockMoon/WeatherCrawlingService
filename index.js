const express = require("express");
const crawler = require("./utils/crawler");
const app = express();
const WeatherCrawler = require("./utils/excelMaker");

let crawlerCase = null;

app.use(express.json());

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

app.get("/", function(req, res) {
  res.send("Hello World!");
});

//Test 코드
app.get("/excel", async (req, res) => {
  makeReport(req, res);
});

const dummy = [
  {
    locationCode: 108,
    year: 2016,
    factorCode: 7
  },
  {
    locationCode: 108,
    year: 2016,
    factorCode: 10
  },
  {
    locationCode: 108,
    year: 2017,
    factorCode: 7
  },
  {
    locationCode: 108,
    year: 2017,
    factorCode: 10
  },
  {
    locationCode: 108,
    year: 2018,
    factorCode: 7
  },
  {
    locationCode: 108,
    year: 2018,
    factorCode: 10
  }
];

function makeReport(req, res) {
  crawlerCase = new WeatherCrawler();
  processArray(dummy, res);
}

const processFunc = async information => {
  const otherResult = await crawler.crawlingWeatherData(information);
  return {
    otherResult: otherResult,
    information: information
  };
};

const processArray = async (informations, res) => {
  const promiseObj = informations.map(processFunc);
  await Promise.all(promiseObj).then(promiseReturnData => {
    promiseReturnData.map(target => {
      crawlerCase.inputOneYearFactorData(
        target.otherResult.factors,
        target.information.locationCode,
        target.information.year,
        target.information.factorCode
      );
    });
    crawlerCase.getWorkBook().write("Weather.xlsx", res);
  });
};

// app.post("/crawler", async (req, res) => {
//   const requestData = req.body;
//   const answer = await crawler.crawlingWeatherData(requestData[0]);
//   res.send(answer);
// });
