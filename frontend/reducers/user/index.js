import { createAction, handleActions } from "redux-actions";

export const initialState = {
  user: null,
  isLoggingIn: false,
  logInErrorReason: ""
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const loginAction = createAction(LOG_IN_REQUEST, payload => payload);
export const logoutAction = createAction(LOG_OUT_REQUEST);
export const loadUserAction = createAction(LOAD_USER_REQUEST);

export default handleActions(
  {
    [LOG_IN_REQUEST]: (state, action) => {
      return {
        ...state,
        isLoggingIn: true,
        logInErrorReason: ""
      };
    },
    [LOG_IN_SUCCESS]: (state, action) => {
      return {
        ...state,
        logInErrorReason: "",
        user: action.payload
      };
    },
    [LOG_IN_FAILURE]: (state, action) => {
      return {
        ...state,
        isLoggingIn: false,
        logInErrorReason: "로그인 에러"
      };
    },
    [LOG_OUT_REQUEST]: (state, action) => {
      return {
        ...state,
        isLoggingIn: true
      };
    },
    [LOG_OUT_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoggingIn: false,
        user: null
      };
    },
    [LOG_OUT_FAILURE]: (state, action) => {
      return {
        ...state,
        isLoggingIn: false
      };
    },
    [LOAD_USER_REQUEST]: (state, action) => {
      return {
        ...state
      };
    },
    [LOAD_USER_SUCCESS]: (state, action) => {
      return {
        ...state,
        user: action.payload
      };
    },
    [LOAD_USER_FAILURE]: (state, action) => {
      return {
        ...state
      };
    }
  },
  initialState
);
