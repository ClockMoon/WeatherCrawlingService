import {
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS
} from "../../reducers/user/index";
import { call, put } from "redux-saga/effects";
import { login, loginAPI } from "../../sagas/user/index";
import { CARD_LOAD_SUCCESS } from "../../reducers/card/index";
import { requestLoginMessage } from "../../components/LoginForm";

describe("login Rqeust", () => {
  it("정상적으로 동기 실행을 한다.", () => {
    const action = {
      payload: undefined
    };
    const iterator = login(action);
    expect(iterator.next().value).toEqual(call(requestLoginMessage));
    expect(iterator.next().value).toEqual(call(loginAPI, undefined));
    expect(iterator.next({ data: undefined }).value).toEqual(
      put({
        type: LOG_IN_SUCCESS,
        payload: undefined
      })
    );

    // expect(iterator.next({ data: undefined }).value).toEqual(
    //   put({
    //     type: CARD_LOAD_SUCCESS,
    //     payload: undefined
    //   })
    // );
  });
});
