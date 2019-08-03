import { createAction, handleActions } from "redux-actions";

export const initialState = {
  reduxTest: []
};

export const TEST = "TEST";

export const testAction = createAction(TEST, payload => payload);

export default handleActions(
  {
    [TEST]: (state, action) => {
      const newReduxTest = state.reduxTest.concat(action.payload);
      return {
        ...state,
        reduxTest: newReduxTest
      };
    }
  },
  initialState
);
