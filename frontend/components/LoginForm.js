import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const onChangeId = e => {
    setUserId(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const requestLogin = () => {
    axios.post("http://localhost:8080/api/user", {
      userId,
      password
    });
  };
  return (
    <div className="loginFormContainer">
      <form className="loginForm">
        <label className="labelId" for="idInputId">
          아이디
        </label>
        <input
          value={userId}
          onChange={onChangeId}
          className="inputId"
          id="idInputId"
        />
        <label className="labelPassword" for="idInputPassword">
          비밀번호
        </label>
        <input
          value={password}
          onChange={onChangePassword}
          type="password"
          className="inputPassword"
          id="idInputPassword"
        />
        <div className="loginButton" onClick={requestLogin}>
          로그인
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
