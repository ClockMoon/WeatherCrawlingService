import scroll from "scroll";
import scrollDoc from "scroll-doc";

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
  const moveDashboardPage = e => {
    const totalPageSize = document.body.scrollHeight;
    fragment = totalPageSize / 5;
    nowScrollLocation = fragment;
    scroll.top(page, nowScrollLocation);
  };
  return (
    <div className="submitCardContainer" onClick={moveDashboardPage}>
      <div className="submitCard">생성</div>
    </div>
  );
};
