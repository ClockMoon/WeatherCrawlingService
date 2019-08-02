import React, { useEffect } from "react";

const Layout = ({ children }) => {
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
        console.log(totalPageSize);
        console.log(index);
      }, 100); //페이지 로드시에 즉시 body의 길이를 가져 올 때 조금씩 부족하게 나옴
    });

    window.addEventListener("scroll", function() {
      console.log(scrollY);
    });
  }, []);
  return (
    <div>
      <div className="header">
        <div className="title">
          <div className="colorFont">WeatherCrawler</div>
        </div>
        <div className="board">
          <div className="colorFont dashBoard">DashBoard</div>
          <div className="colorFont login">Login</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
