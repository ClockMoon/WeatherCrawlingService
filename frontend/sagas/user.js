import { fork, takeEvery, all, call, put, delay } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS
} from "../reducers/user";
import axios from "axios";
import { CARD_LOAD_SUCCESS, CARD_EMPTY_SUCCESS } from "../reducers/card";
import {
  requestLoginMessage,
  successLoginMessage,
  failureLoginMessage,
  requestLogoutMessage
} from "../components/LoginForm";
import { backendURL } from "../util/process";

axios.defaults.baseURL = `${backendURL}/api`;

function loginAPI(loginData) {
  return axios.post("/user/login", loginData, {
    withCredentials: true
  });
}

function* login(action) {
  try {
    yield call(requestLoginMessage);
    const result = yield call(loginAPI, action.payload);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data
    });
    yield put({
      type: CARD_LOAD_SUCCESS,
      payload: result.data.Cards
    });
    yield call(successLoginMessage);
  } catch (e) {
    yield call(failureLoginMessage, e.response.data);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function logoutAPI() {
  return axios.post(
    "/user/logout",
    {},
    {
      withCredentials: true
    }
  );
}

function* logout(state, action) {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
    yield put({
      type: CARD_EMPTY_SUCCESS
    });
    yield call(requestLogoutMessage);
  } catch (e) {
    console.log(e);
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

function loadUserAPI() {
  return axios.get("/user/", {
    withCredentials: true
  });
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: result.data
    });
    yield put({
      type: CARD_LOAD_SUCCESS,
      payload: result.data.Cards
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchLoadUser)]);
}
