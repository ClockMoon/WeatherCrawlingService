import scroll from "scroll";
import scrollDoc from "scroll-doc";
import { useDispatch, useSelector } from "react-redux";
import { addCardAction } from "../reducers/card";
import { toast } from "react-toastify";

const page = scrollDoc();
let fragment = 0;
let nowScrollLocation = fragment;
export const PreviousMoveButton = e => {
  const movePreviousPage = e => {
    const totalPageSize = document.body.scrollHeight;
    fragment = totalPageSize / 5;
    nowScrollLocation -= fragment;
    scroll.top(page, nowScrollLocation);
  };
  return (
    <div className="previousContainer" onClick={movePreviousPage}>
      <div className="previous">이전</div>
    </div>
  );
};

export const NextMoveButton = () => {
  const moveNextPage = e => {
    const totalPageSize = document.body.scrollHeight;
    fragment = totalPageSize / 5;
    nowScrollLocation += fragment;
    scroll.top(page, nowScrollLocation);
  };
  return (
    <div className="nextContainer" onClick={moveNextPage}>
      <div className="next">다음</div>
    </div>
  );
};

export const CreateCardButton = () => {
  const moveDashboardPage = e => {
    const totalPageSize = document.body.scrollHeight;
    fragment = totalPageSize / 5;
    nowScrollLocation = fragment * 2;
    scroll.top(page, nowScrollLocation);
  };
  return (
    <div className="createCardContainer" onClick={moveDashboardPage}>
      <div className="createCard">새 카드 만들기</div>
    </div>
  );
};

export const SubmitCardButton = () => {
  const dispatch = useDispatch();
  const location = useSelector(state => state.card.location);
  const factors = useSelector(state => state.card.factors);
  const startYear = useSelector(state => state.card.startYear);
  const endYear = useSelector(state => state.card.endYear);
  const cardNumber = useSelector(state => state.card.cardNumber);
  const user = useSelector(state => state.user.user);
  const newCard = {
    id: cardNumber,
    location,
    averageTemperture: factors.find(value => value == "평균기온")
      ? true
      : false,
    lowestTemperture: factors.find(value => value == "최저기온") ? true : false,
    highestTemperture: factors.find(value => value == "최고기온")
      ? true
      : false,
    rainfall: factors.find(value => value == "강수량") ? true : false,
    snowfall: factors.find(value => value == "신적설") ? true : false,
    averageWindSpeed: factors.find(value => value == "평균풍속") ? true : false,
    huminity: factors.find(value => value == "상대습도") ? true : false,
    sunnyHour: factors.find(value => value == "일조시간") ? true : false,
    cloudy: factors.find(value => value == "운량") ? true : false,
    weather: factors.find(value => value == "날씨") ? true : false,
    startYear,
    endYear,
    user
  };
  const submitCreateCard = e => {
    if (location && factors.length && startYear && endYear) {
      const totalPageSize = document.body.scrollHeight;
      fragment = totalPageSize / 5;
      nowScrollLocation = fragment;
      scroll.top(page, nowScrollLocation);
      dispatch(
        addCardAction({
          newCard
        })
      );
      toast.success(`${location} 카드가 생성되었습니다!`, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error("선택 되지 않은 요소가 있습니다.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  return (
    <div className="submitCardContainer" onClick={submitCreateCard}>
      <div className="submitCard">생성</div>
    </div>
  );
};
