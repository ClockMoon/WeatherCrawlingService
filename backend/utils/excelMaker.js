const excel = require("excel4node");
module.exports = class WeatherCrawler {
  constructor() {
    this.workbook = new excel.Workbook();
    this.worksheet = this.workbook.addWorksheet(`New Sheets`);
    this.year = -1;
    this.globalDay = 1;
    this.index = 2;
    this.leapYearCount = 0;
    this.yearCounter = -1;
    this.monthInfo = [
      {
        month: 1,
        day: 31
      },
      {
        month: 2,
        day: 28
      },
      {
        month: 3,
        day: 31
      },
      {
        month: 4,
        day: 30
      },
      {
        month: 5,
        day: 31
      },
      {
        month: 6,
        day: 30
      },
      {
        month: 7,
        day: 32
      },
      {
        month: 8,
        day: 32
      },
      {
        month: 9,
        day: 31
      },
      {
        month: 10,
        day: 32
      },
      {
        month: 11,
        day: 31
      },
      {
        month: 12,
        day: 32
      }
    ]; // 7월 부터 하나씩 부족한 현상
  }

  getGlobalDay() {
    return this.globalDay;
  }

  upGlobalDay() {
    this.globalDay++;
  }

  getWorkBook() {
    return this.workbook;
  }

  isLeapYear(year) {
    if ((year % 4 == 0 && (year & 100) != 0) || year % 400 == 0) {
      return true;
    }
    return false;
  }

  inputFactorDataInExcel(
    factors,
    month,
    dayCountInMonth,
    locationCode,
    factorCodeCell
  ) {
    for (let i = month; i <= (dayCountInMonth + 2) * 12; i += 13) {
      this.worksheet.cell(this.index, 1).string(String(locationCode));
      this.worksheet.cell(this.index, 2).string(`${this.globalDay++}일`);
      this.worksheet.cell(this.index++, factorCodeCell).string(factors[i]);
    }
    return this.workbook;
  }

  getfactorCodeCell(factorCode) {
    if (factorCode == 7) return 3;
    if (factorCode == 10) return 4;
    if (factorCode == 8) return 5;
    if (factorCode == 21) return 6;
    if (factorCode == 28) return 7;
    if (factorCode == 6) return 8;
    if (factorCode == 12) return 9;
    if (factorCode == 35) return 10;
    if (factorCode == 59) return 11;
    if (factorCode == 90) return 12;
    return new Error("없는 코드");
  }

  inputOneYearFactorData(factor, locationCode, year, factorCode) {
    this.isSameYear(year);
    if (this.isLeapYear(year) && this.isLeapYear(this.year))
      this.leapYearCount--;
    if (this.isLeapYear(this.year)) this.leapYearCount++;
    let valueCell = this.getfactorCodeCell(factorCode);
    this.setCellPosition();
    for (let index in this.monthInfo) {
      if (this.isLeapYear(year) && index == 1) {
        this.inputFactorDataInExcel(
          factor,
          this.monthInfo[index].month,
          29,
          locationCode,
          valueCell
        );
      } else {
        this.inputFactorDataInExcel(
          factor,
          this.monthInfo[index].month,
          this.monthInfo[index].day,
          locationCode,
          valueCell
        );
        this.year = year;
      }
    }
    return this.workbook;
  }

  setCellPosition() {
    this.globalDay = 1;
    this.index = 2 + this.yearCounter * 365 + this.leapYearCount;
  }

  isSameYear(year) {
    if (this.year != year) this.yearCounter++;
  }

  inputHeaderInExcel(locationName, year, factorName) {
    this.worksheet.cell(1, 1).string(locationName);
    this.worksheet.cell(1, 2).string(`${year}년`);
    this.worksheet.cell(1, 3).string(factorName);
    return this.workbook;
  }

  getFactorName(result) {
    return result.title.match(/\[ .*\]/)[0].match(/[가-힣]*/g)[2];
  }

  getLocationName(result) {
    return result.title.match(/\d [가-힣]*/)[0].match(/[가-힣]+/)[0];
  }
};
