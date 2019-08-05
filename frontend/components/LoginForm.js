import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../reducers/user";

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const loginId = useSelector(state => state.user.user);
  const onChangeId = e => {
    setUserId(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const requestLogin = () => {
    dispatch(
      loginAction({
        userId,
        password
      })
    );
  };
  const requestLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <div className="loginFormContainer">
      {isLoggedIn ? (
        <div>
          <div className="loginedForm">
            <div className="userId">{loginId}</div>
            <div onClick={requestLogout} className="logoutButton">
              로그 아웃
            </div>
          </div>
        </div>
      ) : (
        <form id="loginForm" className="loginForm">
          <label className="labelId" htmlFor="idInputId">
            아이디
          </label>
          <input
            value={userId}
            onChange={onChangeId}
            className="inputId"
            id="idInputId"
          />
          <label className="labelPassword" htmlFor="idInputPassword">
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
      )}
    </div>
  );
};

export default LoginForm;
