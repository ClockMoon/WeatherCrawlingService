import { all, fork, call } from "redux-saga/effects";
import user from "./user";
import card from "./card";

export default function* rootSaga() {
  yield all([fork(user), fork(card)]);
}
