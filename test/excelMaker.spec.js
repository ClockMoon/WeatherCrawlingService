const should = require("should");
const WeatherCrawler = require("../utils/excelMaker");
const { crawlingWeatherData } = require("../utils/crawler");

describe("엑셀 데이터 파싱 테스트", () => {
  let result = null;

  before("데이터 가져오기", async () => {
    result = await crawlingWeatherData({
      locationCode: 108,
      year: 2019,
      factorCode: 7
    });
    //Test 객체 반복 안하게 하기 방법 찾기!
  });

  it("GlobalDay 작동 여부 확인 하기", () => {
    const Test = new WeatherCrawler();
    Test.getGlobalDay().should.be.equal(1);
    Test.upGlobalDay();
    Test.getGlobalDay().should.be.equal(2);
  });

  it("인자 이름 가져오기", () => {
    const Test = new WeatherCrawler();
    const factorname = Test.getFactorName(result);
    factorname.should.be.exactly("일평균기온");
  });

  it("지역 이름 가져오기", () => {
    const Test = new WeatherCrawler();
    const factorname = Test.getLocationName(result);
    factorname.should.be.exactly("서울");
  });

  it("엑셀 파일에 헤더 작성", () => {
    const Test = new WeatherCrawler();
    Test.inputHeaderInExcel("서울", "2019", "일평균기온").write(
      "./sampleExcelFile/Header.xlsx"
    );
  });

  it("엑셀 파일에 데이터 작성", () => {
    const Test = new WeatherCrawler();
    Test.inputFactorDataInExcel(result.factors, 1, 31, 108, 3);
    Test.inputFactorDataInExcel(result.factors, 2, 28, 108, 3);
    Test.inputFactorDataInExcel(result.factors, 3, 31, 108, 3).write(
      "./sampleExcelFile/FactorData.xlsx"
    );
  });

  it("factorCode로 Cell의 위치 설정하기", () => {
    const Test = new WeatherCrawler();

    Test.getfactorCodeCell(7).should.be.equal(3);
  });

  it("엑셀 파일에 하나의 요소를 가진 년 데이터 작성", async () => {
    const Test = new WeatherCrawler();
    const otherResult = await crawlingWeatherData({
      locationCode: 108,
      year: 2018,
      factorCode: 7
    });
    Test.inputOneYearFactorData(otherResult.factors, 108, 2018, 7).write(
      "./sampleExcelFile/YearFactorData.xlsx"
    );
  });

  it("factorCode 작동 확인을 위한 하나의 요소를 가진 년 데이터 작성", async () => {
    const Test = new WeatherCrawler();
    const otherResult = await crawlingWeatherData({
      locationCode: 108,
      year: 2018,
      factorCode: 10
    });
    Test.inputOneYearFactorData(otherResult.factors, 108, 2018, 10).write(
      "./sampleExcelFile/YearFactorDataByFactorCode.xlsx"
    );
  });

  it("연속 인자값 입력을 위한 CellIndex 설정", () => {
    const Test = new WeatherCrawler();
    Test.setCellPosition();
    Test.globalDay.should.be.equal(1);
    Test.index.should.be.equal(-363);
    Test.setCellPosition();
    Test.globalDay.should.be.equal(1);
    Test.index.should.be.equal(-363);
  });

  it("엑셀 파일에 둘 이상의 요소를 가진 1년 데이터 작성", async done => {
    done();
    const Test = new WeatherCrawler();
    const informationDatas = [
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
    let otherResult = null;
    informationDatas.map(async information => {
      otherResult = await crawlingWeatherData(information);
      Test.inputOneYearFactorData(
        otherResult.factors,
        information.locationCode,
        information.year,
        information.factorCode
      ).write("./sampleExcelFile/TwoFactorDataInYears.xlsx");
    });
  });

  it("엑셀 파일에 하나의 요소/ 윤년 포함 여러 년의 데이터 작성(년도 순서를 보장 할 것)", async done => {
    const Test = new WeatherCrawler();
    const informationDatas = [
      {
        locationCode: 108,
        year: 2016,
        factorCode: 7
      },
      {
        locationCode: 108,
        year: 2017,
        factorCode: 7
      },
      {
        locationCode: 108,
        year: 2018,
        factorCode: 7
      }
    ];
    let otherResult = null;
    Promise.all(
      informationDatas.map(async information => {
        otherResult = await crawlingWeatherData(information);
        Test.inputOneYearFactorData(
          otherResult.factors,
          information.locationCode,
          information.year,
          information.factorCode
        ).write("./sampleExcelFile/OneFactorDataInTwoYears.xlsx");
      })
    );
    done();
  });

  it("엑셀 파일에 여러 요소/ 윤년 포함 여러 년의 데이터 작성", async done => {
    const Test = new WeatherCrawler();
    const informationDatas = [
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

    /* 순서 보장 하지 않는 코드 */

    // const writeData = (otherResult,information) => {
    //   Test.inputOneYearFactorData(
    //     otherResult.factors,
    //     information.locationCode,
    //     information.year,
    //     information.factorCode
    //   ).write("TwoFactorDataInTwoYears.xlsx");
    // };
    // informationDatas.map(async information => {
    //   otherResult = await crawlingWeatherData(information);
    //   await writeData(otherResult, information);
    // });

    /* for of 문을 이용해서 모든 처리를 하나씩 하는 코드 (순서보장 확실하나 느림) */

    // const processFunc = async information => {
    //   console.log(information);
    //   otherResult = await crawlingWeatherData(information);
    //   Test.inputOneYearFactorData(
    //     otherResult.factors,
    //     information.locationCode,
    //     information.year,
    //     information.factorCode
    //   ).write("TwoFactorDataInTwoYears.xlsx");
    // };

    // const processArray = async informationDatas => {
    //   for (const information of informationDatas) {
    //     await processFunc(information);
    //   }
    // };

    /* Promise.all을 이용한 순서보장 */

    const processFunc = async information => {
      const otherResult = await crawlingWeatherData(information);
      return {
        otherResult: otherResult,
        information: information
      };
    };

    const processArray = async informationDatas => {
      const promiseObj = informationDatas.map(processFunc);
      Promise.all(promiseObj).then(promiseReturnData => {
        promiseReturnData.map(target => {
          Test.inputOneYearFactorData(
            target.otherResult.factors,
            target.information.locationCode,
            target.information.year,
            target.information.factorCode
          ).write("./sampleExcelFile/TwoFactorDataInTwoYears.xlsx");
        });
      });
    };

    processArray(informationDatas);

    done();
  });
});
