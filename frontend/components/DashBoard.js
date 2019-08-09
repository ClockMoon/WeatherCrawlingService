import React, { useState } from "react";
import { Select } from "antd";
import locationInformation from "../util/locationInformation";
import { CreateCardButton } from "./MoveButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fileDownloadAction,
  cardEditAction,
  cardDeleteAction
} from "../reducers/card";
import factorInformation from "../util/factorInformation";
import { toast } from "react-toastify";

export const requestFileMessage = () => {
  toast.info("생성중입니다.", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return null;
};

export const successFileMessage = () => {
  toast.success("파일이 생성되었습니다!", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return null;
};

export const failureFileMessage = () => {
  toast.error("파일 생성에 실패했습니다.!", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return null;
};

export const requestCardEdit = () => {
  toast.info("수정중입니다.", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return null;
};

export const successCardEdit = () => {
  toast.success("수정되었습니다!", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return null;
};

export const failureCardEdit = () => {
  toast.error("수정에 실패했습니다.!", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return null;
};
export const requestCardDelete = () => {
  toast.info("삭제중입니다.", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return null;
};

export const successCardDelete = () => {
  toast.success("삭제되었습니다!", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return null;
};

export const failureCardDelete = () => {
  toast.error("삭제 할 수 없습니다!", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return null;
};

const { Option } = Select;

const DashBoard = () => {
  const user = useSelector(state => state.user.user);
  let cards = useSelector(state => state.card.cards);

  return (
    <div className="dashboardContainer">
      <div className="cardContainer">
        {cards.length ? (
          cards.map((item, index) => {
            return (
              <Card
                key={item.id}
                id={item.id}
                location={item.location}
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
          })
        ) : (
          <div className="noCardNoticeContainer">
            <div className="noCardNotice">카드가 없습니다.</div>
            <div className="noCardNotice">
              파일 생성을 위해 로그인 하거나, 카드를 생성하세요
            </div>
          </div>
        )}
      </div>
      <div className="buttonsContainer">
        <div className="empty" />
        <CreateCardButton />
      </div>
    </div>
  );
};

const Card = props => {
  const onClickMethod = e => {
    if (e.target.className.match(/edit.*/))
      e.target.parentNode.parentNode.classList.toggle("active");
    else e.target.parentNode.parentNode.parentNode.classList.toggle("active");
    if (e.target.innerHTML == "수정 완료") {
      requestEdit();
    }
    if (e.target.innerHTML == "삭제 하기") {
      requestDelete();
    }
  };

  const requestEdit = () => {
    dispatch(
      cardEditAction({
        id: props.id,
        location
      })
    );
  };

  const requestDelete = () => {
    dispatch(
      cardDeleteAction({
        id: props.id
      })
    );
  };

  const selectedChange = value => {
    setLocation(value);
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

  const [location, setLocation] = useState(props.location);
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
  const dispatch = useDispatch();
  const onFileDownload = e => {
    const fileData = [];
    const rootNode = e.target.parentNode.parentNode;
    const location = rootNode.querySelector(".cardLocation").innerHTML;
    const factors = Array.from(rootNode.querySelectorAll(".factor"))
      .map(value => value.innerHTML)
      .filter(value => value);
    const startYear = rootNode
      .querySelector(".startYear")
      .innerHTML.match(/\d{4}/)[0];
    const endYear = rootNode
      .querySelector(".endYear")
      .innerHTML.match(/\d{4}/)[0];

    const convertLocationCode = location => {
      const targetLocation = locationInformation.filter(
        target => target.location == location
      );
      return targetLocation[0].code;
    };

    const convertFactorCode = factor => {
      const targetFactor = factorInformation.filter(
        target => target.factor == factor
      );
      return targetFactor[0].code;
    };

    for (let i = startYear; i <= endYear; i++) {
      factors.map(factor => {
        fileData.push({
          locationCode: convertLocationCode(location),
          year: Number(i),
          factorCode: convertFactorCode(factor)
        });
      });
    }
    dispatch(
      fileDownloadAction({
        fileData: fileData
      })
    );
  };

  return (
    <>
      <div className="card">
        <div className="card-side card-side-front">
          <div className="cardLocationTitle">위치</div>
          <div className="cardLocation">{location}</div>
          <div className="cardFactor">
            <div className="cardFactorTitle">인자</div>
            <div className="cardFactorFactors">
              <div className="factor">
                {averageTemperture ? "평균기온" : null}
              </div>
              <div className="factor">
                {lowestTemperture ? "최저기온" : null}
              </div>
              <div className="factor">
                {highestTemperture ? "최고기온" : null}
              </div>
              <div className="factor">{rainfall ? "강수량" : null}</div>
              <div className="factor">{snowfall ? "신적설" : null}</div>
              <div className="factor">
                {averageWindSpeed ? "평균풍속" : null}
              </div>
              <div className="factor">{huminity ? "상대습도" : null}</div>
              <div className="factor">{sunnyHour ? "일조시간" : null}</div>
              <div className="factor">{cloudy ? "운량" : null}</div>
              <div className="factor">{weather ? "날씨" : null}</div>
            </div>
          </div>
          <div className="cardYear">
            <div className="cardYearTitle">년도</div>
            <div className="cardYears">
              <div className="startYear">{startYear} 년부터&nbsp;</div>
              <div className="endYear">{endYear} 년까지</div>
            </div>
          </div>
          <div className="createFileButton">
            <div className="colorFont" onClick={onFileDownload}>
              파일 생성
            </div>
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
          <div className="editCompleteButton">
            <div onClick={onClickMethod}>수정 완료</div>
            <div onClick={onClickMethod}>삭제 하기</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
