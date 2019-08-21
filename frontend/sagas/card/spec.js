<<<<<<< HEAD
import { ADD_CARD_SUCCESS } from "../../reducers/card/index";
=======
import {
  ADD_CARD_REQUEST,
  ADD_CARD_FAILURE,
  ADD_CARD_SUCCESS
} from "../../reducers/card/index";
>>>>>>> deploy
import { call, put } from "redux-saga/effects";
import { addCard, addCardAPI } from "../../sagas/card/index";

describe("addCard REQUEST", () => {
  it("정상적으로 동기 실행을 한다.", () => {
    const action = {
      payload: undefined
    };
    const iterator = addCard(action);
    expect(iterator.next().value).toEqual(call(addCardAPI, undefined));
    expect(iterator.next({ data: undefined }).value).toEqual(
      put({
        type: ADD_CARD_SUCCESS,
        payload: undefined
      })
    );
  });
});
