# Example

**서비스 주소입니다.**

[http://pastweathercrawler.tk/](http://pastweathercrawler.tk/)
기상청의 과거자료 데이터를 크롤링 하여 엑셀 파일로 만들어 줍니다.

**다음 주소에서 가져옵니다.**

[http://www.weather.go.kr/weather/climate/past_table.jsp ]([http://www.weather.go.kr/weather/climate/past_table.jsp)

**이렇게 사용됩니다.**

해당 서비스를 이용하면 다량의 데이터를 쉽게 엑셀 파일로 옮길 수 있고, 1년 단위로 한 열에 정렬되기 때문에, 차트나 계산하기 쉽고 이는 빠른 연구진행으로 이어질 것입니다. 또한 GIS프로그램의 테이블에 적용하기 쉬운 포맷으로 작성되기 때문에, GIS를 이용한 기상연구에도 도움이 됩니다.

**아래와 같은 포멧으로 다운 받아 집니다.**

![](https://user-images.githubusercontent.com/39228032/62817387-9d38fe00-bb70-11e9-84fa-b1bd5c0f28ea.PNG)

**다음과 같이 엑이 엑셀로 쉽게 차트를 만들 수 있습니다**
![](https://user-images.githubusercontent.com/39228032/62817386-9d38fe00-bb70-11e9-82a6-b2b5d5e8fa44.PNG)

# Detail

**회원 가입**

해당 서비스는 별다른 회원가입 과정을 거치지 않습니다.
로그인 시 ID가 없는 사용자라면 회원 가입 후 바로 사용 가능합니다.
다만 ID가 이미 있다면 ID에 맞는 비밀번호를 입력해야 합니다 :)

**로그인**

로그인을 하게 되면, 이전에 만들어진 Card 정보를 최대 5개 까지 기억해둘 수 있습니다.

**파일이 클 경우**

요청이 오래 걸릴 수 있습니다. 최대 1분까지 잠시만 기다려 주세요!

## 개발 도구

### FrontEnd

- React
- Redux
- Hooks
- Redux-saga
- Axios
- Jest
- Enzyme
- EC2

### BackEnd

- Express
- Mocha
- Axios
- excel4node
- passport
- Sequelize
- cheerio
- EC2

## 테스트 코드

### FrontEnd

**컴포넌트 렌더링 테스트**

    describe("DashBoard 컴포넌트 테스트.", () => {
        it("DashBoard가 정상적으로 렌더링됩니다.", () => {
        const  component  =  mount(
    	    <Provider  store={store()}>
    		    <DashBoard  />
    	    </Provider>
        );
        const  dashboardContainer  =  component.find(".dashboardContainer");
        expect(dashboardContainer.debug()).toMatchSnapshot();
        });
    });

**리듀서 테스트**

    describe("Posts Reducer", () => {
        it("카드 추가 액션에 성공한다..", async () => {
    	    const  cards  = [];
    	    const  addCardDummy  = {
    		   ...
    	    };
    	    const  expectedState  = {
    	    cardNumber:  cards.length  +  1,
    	    cards:  cards.concat(addCardDummy),
    	    ...
    	    };
    	    const  newState  =  cardReducer(undefined, {
    		    type:  ADD_CARD_SUCCESS,
    		    payload:  addCardDummy
    	    });
    	    expect(newState).toEqual(expectedState);
        });
    });

**리덕스 사가 테스트**

    describe("addCard REQUEST", () => {

    	it("정상적으로 동기 실행을 한다.", () => {
    		const  action  = {
    			payload:  undefined
    		};
    		const  iterator  =  addCard(action);
    		expect(iterator.next().value).toEqual(call(addCardAPI, undefined));
    		expect(iterator.next({ data:  undefined }).value).toEqual(
    			put({
    				type:  ADD_CARD_SUCCESS,
    				payload:  undefined
    			})
    		);
    	});
    });

### BackEnd

**엑셀 파싱 테스트**

    const  should  =  require("should");
    const  WeatherCrawler  =  require("../utils/excelMaker");
    const { crawlingWeatherData } =  require("../utils/crawler");
    describe("엑셀 데이터 파싱 테스트", () => {
        let  result  =  null;
        before("데이터 가져오기", async () => {
    	    result  =  await  crawlingWeatherData({
    	    locationCode:  108,
    	    year:  2019,
    	    factorCode:  7
    	    });
        });
        it("GlobalDay 작동 여부 확인 하기", () => {
    	    const  Test  =  new  WeatherCrawler();
    	    Test.getGlobalDay().should.be.equal(1);
    	    Test.upGlobalDay();
    	    Test.getGlobalDay().should.be.equal(2);
        });
        it("인자 이름 가져오기", () => {
    	    const  Test  =  new  WeatherCrawler();
    	    const  factorname  =  Test.getFactorName(result);
    	    factorname.should.be.exactly("일평균기온");
        });
        ....
        it("엑셀 파일에 하나의 요소/ 윤년 포함 여러 년의 데이터 작성(년도 순서를 보장 할 것)", async  done  => {
    	    const  Test  =  new  WeatherCrawler();
    	    const  informationDatas  = [{..}]
    	    let  otherResult  =  null;
    	    Promise.all(
    	    informationDatas.map(async  information  => {
    	    otherResult  =  await  crawlingWeatherData(information);
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

## 배포

EC2를 이용하여 FrontServer와 BackEnd 서버를 분리하여 리눅스 서버에 배포 중

## 기타 이슈

**백엔드에서 만들어진 .xlsx 파일 클라이언트로 전달 문제**

    const  url  =  window.URL.createObjectURL(new  Blob([response.data]));
    const  link  =  document.createElement("a");
    link.href  =  url;
    link.setAttribute("download", "Weather.xlsx");
    document.body.appendChild(link);
    link.click();

요청받은 데이터를 프론트에서 Blob으로 저장하여 링크를 만들어, 클릭이벤트를 다시 발생시켜 다운 받도록 유도

**백엔드와 클라이언트 분리로 인한 쿠키 공유 문제**

    app.use(
        session({
        secret:  process.env.COOKIE_SECRET,
        cookie: {
    	    domain:  ".pastweathercrawler.tk"
        },

백엔드 서버에 서브 도메인을 제공 한 후 쿠키의 공유 권한을 백엔드 서버에 확대

**기상청 데이터 요청시 인코딩 문제**

    const  getHttpWeatherData  =  async  weatherInfomation  => {
        const  response  =  await  axios.request({
    	    method:  "GET",
    	    url:  http://www.weather.go.kr/weather/climate/past_table.jsp?stn=${
    	    weatherInfomation.locationCode
    	    }&yy=${weatherInfomation.year}&obs=${
    	    weatherInfomation.factorCode
    	    }&x=16&y=6,
    	    responseType:  "arraybuffer",
    	    responseEncoding:  "binary"
        });
        if (response.status  ==  200) {
    	    return  iconv.decode(response.data, "euc-kr").toString();
        }
        return  new  Error("페이지 에러");
    };

버퍼로 받은 후 iconv로 인코딩

**클라이언트에서 로그인 된 유저 load 시에 잠시 동안 로그인이 안되는 상황**

데이터를 Fetch하기 이전에 화면이 렌더링 되는 것으로 파악하여 첫 화면에서 서버 사이드 렌더링으로 문제 해결

## Q&A

만약 사용의 불편함이나, 궁금한 점이 있을 시에 언제든지 다음 주소로 연락해주세요.
jiwon3346@gmail.com

## 현재 진행 상황

테스트 코드 작성 중...
