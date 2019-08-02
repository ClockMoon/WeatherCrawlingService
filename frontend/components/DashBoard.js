import React, { useState } from "react";

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
  );
};

const Card = props => {
  const onClickMethod = e => {
    if (e.target.className.match(/edit.*/))
      e.target.parentNode.parentNode.classList.toggle("active");
    else e.target.parentNode.parentNode.parentNode.classList.toggle("active");
  };
  const selectedChange = e => {
    setTitle(e.target.value);
  };
  const {
    tempertureFactor,
    windFactor,
    rainfallFactor,
    startYear,
    endYear
  } = props;

  const [title, setTitle] = useState(props.title);

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
          <form id="form">
            <select
              onChange={selectedChange}
              className="cardSelectBox"
              selected={title}
            >
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="강원">강원</option>
              <option value="부산">부산</option>
              <option value="대구">대구</option>
            </select>
          </form>
          <div className="editCompleteButton" onClick={onClickMethod}>
            수정 완료
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
