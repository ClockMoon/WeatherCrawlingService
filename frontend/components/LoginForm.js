import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../reducers/user";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
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
      {user ? (
        <div>
          <div className="loginedForm">
            <div className="userId">{user.userId}</div>
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

export const requestLoginMessage = () => {
  toast.info("로그인을 시도합니다.", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return;
};

export const successLoginMessage = () => {
  toast.success("로그인을 성공하였습니다.", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return;
};

export const failureLoginMessage = reason => {
  toast.error(reason, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return;
};

export const requestLogoutMessage = () => {
  toast.info("로그아웃을 합니다.", {
    position: toast.POSITION.BOTTOM_RIGHT
  });
  return;
};

export default LoginForm;
