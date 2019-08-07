import { put, call, all, fork, takeEvery } from "redux-saga/effects";
import {
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  FILE_DOWNLOAD_REQUEST,
  FILE_DOWNLOAD_FAILURE,
  FILE_DOWNLOAD_SUCCESS
} from "../reducers/card";
import axios from "../../backend/node_modules/axios";
import {
  requestFileMessage,
  successFileMessage,
  failureFileMessage
} from "../components/DashBoard";

function addCardAPI(cardData) {
  return axios.post("http://localhost:8080/api/card", cardData);
}

function* addCard(action) {
  try {
    const result = yield call(addCardAPI, action.payload);
    yield put({
      type: ADD_CARD_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: ADD_CARD_FAILURE
    });
  }
}

function* watchingAddCard() {
  yield takeEvery(ADD_CARD_REQUEST, addCard);
}

function fileDownloadAPI(data) {
  return axios({
    url: "http://localhost:8080/api/card/excel",
    method: "POST",
    data: {
      data
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
}

function* fileDownload(action) {
  try {
    yield call(requestFileMessage);
    yield call(fileDownloadAPI, action.payload);
    yield put({
      type: FILE_DOWNLOAD_SUCCESS
    });
    yield call(successFileMessage);
  } catch (e) {
    console.error(e);
    yield call(failureFileMessage);
    yield put({
      type: FILE_DOWNLOAD_FAILURE
    });
  }
}

function* watchingFileDownload() {
  yield takeEvery(FILE_DOWNLOAD_REQUEST, fileDownload);
}

export default function* cardSaga() {
  yield all([fork(watchingAddCard), fork(watchingFileDownload)]);
}
