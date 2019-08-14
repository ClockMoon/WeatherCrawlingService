import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import scroll from "scroll";
import scrollDoc from "scroll-doc";
import { LOAD_USER_REQUEST, loadUserAction } from "../../reducers/user";

const page = scrollDoc();
let fragment = 0;
let nowScrollLocation = fragment;

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    let totalPageSize;
    let fragment;
    let indexPage;
    let loginPage;
    let index;
    let login;
    window.addEventListener("load", function() {
      setTimeout(() => {
        totalPageSize = document.body.scrollHeight;
        fragment = totalPageSize / 5;
        indexPage = 1;
        loginPage = 0;
        index = fragment * indexPage;
        login = fragment * loginPage;
        window.scrollTo(0, index);
      }, 100); //페이지 로드시에 즉시 body의 길이를 가져 올 때 조금씩 부족하게 나옴
    });
    window.addEventListener(
      "wheel",
      function(event) {
        event.preventDefault();
      },
      { passive: false }
    );
  }, []);

  const goDashBoard = e => {
    const totalPageSize = document.body.scrollHeight;
    fragment = totalPageSize / 5;
    nowScrollLocation = fragment;
    scroll.top(page, nowScrollLocation);
    const target = e.target;
    target.classList.add("activeJump");
    setTimeout(() => {
      target.classList.remove("activeJump");
    }, 1100);
  };

  const goLogin = e => {
    nowScrollLocation = 0;
    scroll.top(page, nowScrollLocation);
    const target = e.target;

    target.classList.add("activeJump");
    setTimeout(() => {
      target.classList.remove("activeJump");
    }, 1100);
  };

  return (
    <div>
      <div className="header">
        <div className="title">
          <div className="colorFont">WeatherCrawler</div>
        </div>
        <div className="board">
          <div onClick={goDashBoard} className="colorFont dashBoard">
            DashBoard
          </div>

          <div onClick={goLogin} className="colorFont login">
            {user ? "Info" : "Login"}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
export default Layout;
