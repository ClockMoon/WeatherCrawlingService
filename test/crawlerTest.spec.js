const should = require("should");
const {
  crawlingWeatherData,
  getHttpWeatherData,
  setHtmlTarget,
  getTargetDataByTag,
  getOnlyWeatherFactor
} = require("../utils/crawler");

describe("기상청 HTTP 응답", () => {
  let htmlData = null;

  before(async () => {
    htmlData = await getHttpWeatherData({
      locationCode: 108,
      year: 2019,
      factorCode: 7
    });
  });

  it("제대로 된 Http 데이터를 가져왔다.", () => {
    htmlData.should.match(/\[ 일평균기온\(\℃\) \] 108 서울 \/ 2019년/);
  });

  it("모든 http 데이터 중 원하는 태그의 데이터를 가져왔다.", () => {
    const htmlTarget = setHtmlTarget(htmlData);
    const titleHtmlData = getTargetDataByTag(htmlTarget, ".table_topinfo");
    titleHtmlData.should.exactly("[ 일평균기온(℃) ] 108 서울 / 2019년");
  });

  it("날씨데이터에 날씨데이터만 가져옵니다.", () => {
    const htmlTarget = setHtmlTarget(htmlData);
    const weatherFactorHtmlData = getTargetDataByTag(
      htmlTarget,
      ".table_develop tbody tr"
    );

    const onlyWeatherFactor = getOnlyWeatherFactor(weatherFactorHtmlData);
    onlyWeatherFactor.should.not.match(/[가-힣]|\t|\d{3}/); // 두개 이상의 공백에 대한 추가 테스트 코드 필요
  });

  it("크롤링 함수를 실행하여, 문자열인 타이틀과, 배열인 데이터를 리턴 받습니다.", async () => {
    const result = await crawlingWeatherData({
      locationCode: 108,
      year: 2019,
      factorCode: 7
    });
    result.title.should.exactly("[ 일평균기온(℃) ] 108 서울 / 2019년");
    result.factors.should.be.instanceOf(Array);
    result.factors.should.have.length(411);
  });
});
