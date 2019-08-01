import React from "react";
import axios from "axios";

const App = () => {
  const dummy = [
    {
      locationCode: 108,
      year: 2016,
      factorCode: 7
    },
    {
      locationCode: 108,
      year: 2016,
      factorCode: 7
    },
    {
      locationCode: 108,
      year: 2016,
      factorCode: 7
    },
    {
      locationCode: 108,
      year: 2016,
      factorCode: 7
    }
  ];

  const onUserSubmit = async e => {
    e.preventDefault();
    return await axios.post("http://localhost:8080/api/user", {
      userId: "userId",
      password: "password"
    });
  };

  const onExcelTest = async e => {
    e.preventDefault();
    const newWindow = window.open(
      "http://localhost:8080/api/card/excel",
      "newWindow"
    );
    const eventForm = e.target;
    // return await axios.get("http://localhost:8080/api/card");
  };

  return (
    <div>
      <form onSubmit={onUserSubmit}>
        <button>유저 테스트</button>
      </form>
      <form method="post" onSubmit={onExcelTest}>
        <button>엑셀테스트</button>
      </form>
    </div>
  );
};

export default App;
