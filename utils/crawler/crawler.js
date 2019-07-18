const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getHttpWeatherData = async (location, year, factor) => {
  const response = await axios.request({
    method: "GET",
    url: `http://www.weather.go.kr/weather/climate/past_table.jsp?stn=${location}&yy=${year}&obs=${factor}&x=16&y=6`,
    responseType: "arraybuffer",
    responseEncoding: "binary"
  });
  if (response.status == 200) {
    return iconv.decode(response.data, "euc-kr").toString();
  }
  return new Error("페이지 에러");
};

const setHtmlTarget = html => {
  return cheerio.load(html);
};

const getTargetDataByTag = (target, tag) => {
  return target(tag)
    .text()
    .trim();
};

function getOnlyWeatherFactor(text) {
  var removeTap = text.replace(/\t/gi, "");
  var removeCarigi = removeTap.replace(/\n{3}/gi, "");
  var removeDay = removeCarigi.replace(/\d일/gi, "");
  var removeAverageText = removeDay.replace(/평균/gi, "");
  return removeAverageText;
}

async function crawlingWeatherData(locationCode, year, factor) {
  const htmlData = await getHttpWeatherData(locationCode, year, factor[0]);
  const htmlTarget = setHtmlTarget(htmlData);
  const title = getTargetDataByTag(htmlTarget, ".table_topinfo");
  const weatherFactorHtmlData = getTargetDataByTag(
    htmlTarget,
    ".table_develop tbody tr"
  );
  const onlyWeatherFactor = getOnlyWeatherFactor(weatherFactorHtmlData);
  const factors = onlyWeatherFactor.split("\n");
  return {
    title,
    factors
  };
}

module.exports = {
  crawlingWeatherData,
  getHttpWeatherData,
  setHtmlTarget,
  getTargetDataByTag,
  getOnlyWeatherFactor
};
