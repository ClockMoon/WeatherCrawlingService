import React, { useState } from "react";
import { Select } from "antd";
import locationInformation from "../util/locationInformation";
import { CreateCardButton } from "./MoveButton";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

const DashBoard = () => {
  const dummy = useSelector(state => state.card.cards);
  return (
    <div className="dashboardContainer">
      <div className="cardContainer">
        {dummy.map((item, index) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              averageTemperture={item.averageTemperture}
              lowestTemperture={item.lowestTemperture}
              highestTemperture={item.highestTemperture}
              rainfall={item.rainfall}
              snowfall={item.snowfall}
              averageWindSpeed={item.averageWindSpeed}
              huminity={item.huminity}
              sunnyHour={item.sunnyHour}
              cloudy={item.cloudy}
              weather={item.weather}
              startYear={item.startYear}
              endYear={item.endYear}
            />
          );
        })}
      </div>
      <CreateCardButton />
    </div>
  );
};

const Card = props => {
  const onClickMethod = e => {
    if (e.target.className.match(/edit.*/))
      e.target.parentNode.parentNode.classList.toggle("active");
    else e.target.parentNode.parentNode.parentNode.classList.toggle("active");
  };
  const selectedChange = value => {
    setTitle(value);
  };
  const {
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
  } = props;

  const [title, setTitle] = useState(props.title);
  const dummy = [];
  locationInformation.map(target => {
    dummy.push(
      <Option
        className="selectOption"
        key={target.code}
        value={target.location}
      >
        {target.location}
      </Option>
    );
  });

  return (
    <>
      <div className="card">
        <div className="card-side card-side-front">
          <div className="cardTitle">{title}</div>
          <div className="cardCreatedDate">생성일자 : 2019-05-03</div>
          <div className="cardFactor">
            <div className="cardFactorTitle">인자</div>
            <div className="cardFactorFactors">
              <div>{averageTemperture ? "평균기온" : null}</div>
              <div>{lowestTemperture ? "최저기온" : null}</div>
              <div>{highestTemperture ? "최고기온" : null}</div>
              <div>{rainfall ? "강수량" : null}</div>
              <div>{snowfall ? "신적설" : null}</div>
              <div>{averageWindSpeed ? "평균풍속" : null}</div>
              <div>{huminity ? "상대습도" : null}</div>
              <div>{sunnyHour ? "일조시간" : null}</div>
              <div>{cloudy ? "운량" : null}</div>
              <div>{weather ? "날씨" : null}</div>
            </div>
          </div>
          <div className="cardYear">
            <div className="cardYearTitle">년도</div>
            <div className="cardYears">
              <div className="startYear">{startYear} 년부터&nbsp;</div>
              <div className="endYear">{endYear}년까지</div>
            </div>
          </div>
          <div className="createFileButton">
            <div className="colorFont">파일 생성</div>
          </div>
          <div className="editButton" onClick={onClickMethod}>
            <div className="colorFont">카드 수정</div>
          </div>
        </div>
        <div className="card-side card-side-back">
          <Select
            size="default"
            onChange={selectedChange}
            className="cardSelectBox"
          >
            {dummy}
          </Select>
          <div className="editCompleteButton" onClick={onClickMethod}>
            수정 완료
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
