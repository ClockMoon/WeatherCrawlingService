import { createAction, handleActions } from "redux-actions";

export const initialState = {
  isLoggedIn: false,
  user: null
};

export const LOG_IN = "LOG_IN";

export const loginAction = createAction(LOG_IN, payload => payload);

export default handleActions(
  {
    [LOG_IN]: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.userId
      };
    }
  },
  initialState
);
