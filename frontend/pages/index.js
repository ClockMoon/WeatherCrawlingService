import React, { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import DashBoard from "../components/DashBoard";
const Home = () => {
  const dummy = [
    {
      locationCode: 108,
      year: 2016,
      factorCode: 7
    }
  ];
  const onclick = () => {
    axios({
      url: "http://localhost:8080/api/card/excel",
      method: "POST",
      data: {
        dummy
      },
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Weather.xlsx");
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <>
      <div className="page loginFormPage">
        <LoginForm />
      </div>
      <div className="page dashBoardPage">
        <DashBoard />
      </div>
    </>
  );
};

export default Home;
