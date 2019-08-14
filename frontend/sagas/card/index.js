import { put, call, all, fork, takeEvery } from "redux-saga/effects";
import {
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  FILE_DOWNLOAD_REQUEST,
  FILE_DOWNLOAD_FAILURE,
  FILE_DOWNLOAD_SUCCESS,
  CARD_EDIT_FAILURE,
  CARD_EDIT_REQUEST,
  CARD_EDIT_SUCCESS,
  CARD_DELETE_REQUEST,
  CARD_DELETE_SUCCESS,
  CARD_DELETE_FAILURE
} from "../../reducers/card/index";
import axios from "axios";
import {
  requestFileMessage,
  successFileMessage,
  failureFileMessage,
  requestCardEdit,
  successCardEdit,
  failureCardEdit,
  requestCardDelete,
  successCardDelete,
  failureCardDelete
} from "../../components/DashBoard";

import { backendURL } from "../../util/process";

axios.defaults.baseURL = `${backendURL}/api`;

export function addCardAPI(cardData) {
  if (cardData) return axios.post("/card", cardData);
  return null;
}

export function* addCard(action) {
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
    url: `/card/excel`,
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

function cardEditAPI(cardData) {
  return axios.put("/card", cardData);
}

function* cardEdit(action) {
  try {
    yield call(requestCardEdit);
    yield call(cardEditAPI, action.payload);
    yield put({
      type: CARD_EDIT_SUCCESS,
      payload: action.payload
    });
    yield call(successCardEdit);
  } catch (e) {
    console.error(e);
    yield call(failureCardEdit);
    yield put({
      type: CARD_EDIT_FAILURE,
      payload: e
    });
  }
}

function* watchingEditCard() {
  yield takeEvery(CARD_EDIT_REQUEST, cardEdit);
}

function cardDeleteAPI(cardData) {
  return axios.delete("/card", { data: cardData });
}

function* cardDelete(action) {
  try {
    yield call(requestCardDelete);
    yield call(cardDeleteAPI, action.payload);
    yield put({
      type: CARD_DELETE_SUCCESS,
      payload: action.payload
    });
    yield call(successCardDelete);
  } catch (e) {
    console.log(e);
    yield call(failureCardDelete);
    yield put({
      type: CARD_DELETE_FAILURE
    });
  }
}

function* watchingDeleteCard() {
  yield takeEvery(CARD_DELETE_REQUEST, cardDelete);
}

export default function* cardSaga() {
  yield all([
    fork(watchingAddCard),
    fork(watchingFileDownload),
    fork(watchingEditCard),
    fork(watchingDeleteCard)
  ]);
}
