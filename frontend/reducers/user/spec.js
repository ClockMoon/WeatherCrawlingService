import userReducer, { LOG_IN_SUCCESS } from "./index";

describe("Posts Reducer", () => {
  it("default state가 리턴된다.", () => {
    const newState = userReducer(undefined, {});
    expect(newState).toEqual({
      user: null,
      isLoggingIn: false,
      logInErrorReason: ""
    });
  });

  it("로그인 액션에 성공한다.", async () => {
    const dummyUser = "testUser";

    const expectedState = {
      user: dummyUser,
      isLoggingIn: false,
      logInErrorReason: ""
    };

    const newState = userReducer(undefined, {
      type: LOG_IN_SUCCESS,
      payload: dummyUser
    });
    expect(newState).toEqual(expectedState);
  });
});
