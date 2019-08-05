import { put, call, all, fork, takeEvery } from "redux-saga/effects";
import {
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  CARD_LOAD_REQUEST
} from "../reducers/card";
import axios from "../../backend/node_modules/axios";

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

function loadCardAPI() {
  return axios.get(`http://localhost:8080/api/card`);
}

function* loadCard(action) {
  try {
    const cards = yield call(loadCardAPI, action.payload);
    console.log("saga", cards);
  } catch (e) {
    console.log(e);
  }
}

function* watchingCardLoad() {
  yield takeEvery(CARD_LOAD_REQUEST, loadCard);
}

export default function* cardSaga() {
  yield all([fork(watchingAddCard), fork(watchingCardLoad)]);
}
