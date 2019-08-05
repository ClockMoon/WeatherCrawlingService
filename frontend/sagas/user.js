import { fork, takeEvery, all, call, put, delay } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS
} from "../reducers/user";
import axios from "../../backend/node_modules/axios";
import { CARD_LOAD_REQUEST } from "../reducers/card";

function loginAPI(loginData) {
  return axios.post("http://localhost:8080/api/user", loginData);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.payload);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data
    });
    yield put({
      type: CARD_LOAD_REQUEST,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function* logout(state, action) {
  try {
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    console.log(e);
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
