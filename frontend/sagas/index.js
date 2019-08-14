import { all, fork } from "redux-saga/effects";
import user from "./user/index";
import card from "./card/index";

export default function* rootSaga() {
  yield all([fork(user), fork(card)]);
}
