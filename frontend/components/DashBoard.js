import React, { useState } from "react";
import { Select } from "antd";
import locationInformation from "../util/locationInformation";
import { CreateCardButton } from "./MoveButton";
const { Option } = Select;

const dummy = [
  {
    id: 1,
    title: "서울",
    tempertureFactor: true,
    windFactor: false,
    rainfallFactor: true,
    startYear: 1960,
    endYear: 2010
  },
  {
    id: 2,
    title: "대구",
    tempertureFactor: false,
    windFactor: false,
    rainfallFactor: true,
    startYear: 1968,
    endYear: 2018
  }
];

const DashBoard = () => {
  return (
    <div className="dashboardContainer">
      <div className="cardContainer">
        {dummy.map((item, index) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              tempertureFactor={item.tempertureFactor}
              windFactor={item.windFactor}
              rainfallFactor={item.rainfallFactor}
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
    tempertureFactor,
    windFactor,
    rainfallFactor,
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
              <div>{tempertureFactor ? "평균온도" : null}</div>
              <div>{windFactor ? "평균풍속" : null}</div>
              <div>{rainfallFactor ? "강수량" : null}</div>
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
