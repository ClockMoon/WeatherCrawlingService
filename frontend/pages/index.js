import React from "react";
import LoginForm from "../components/LoginForm";
import DashBoard from "../components/DashBoard";
import LocationSelect from "../components/LocationSelect";
import FactorSelect from "../components/FactorSelect";
import YearSelect from "../components/YearSelect";

const Home = () => {
  return (
    <>
      <div className="page loginFormPage">
        <LoginForm />
      </div>
      <div className="page dashBoardPage">
        <DashBoard />
      </div>
      <div className="page locationSelectPage">
        <LocationSelect />
      </div>
      <div className="page factorSelectPage">
        <FactorSelect />
      </div>
      <div className="page yearSelectPage">
        <YearSelect />
      </div>
    </>
  );
};

export default Home;
