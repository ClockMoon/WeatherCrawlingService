import { createAction, handleActions } from "redux-actions";

export const initialState = {
  isLoggedIn: false,
  user: null,
  isLoggingIn: false,
  logInErrorReason: ""
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";

export const loginAction = createAction(LOG_IN_REQUEST, payload => payload);
export const logoutAction = createAction(LOG_OUT_REQUEST);

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
        isLoggingIn: false,
        isLoggedIn: true,
        logInErrorReason: "",
        user: action.payload
      };
    },
    [LOG_IN_FAILURE]: (state, action) => {
      return {
        ...state,
        isLoggingIn: false,
        logInErrorReason: action.payload
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
        isLoggedIn: false,
        user: null
      };
    }
  },
  initialState
);
