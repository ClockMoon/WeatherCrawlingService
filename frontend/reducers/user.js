import { createAction, handleActions } from "redux-actions";

export const initialState = {
  reduxTest: false
};

export const TEST = "TEST";

export const testAction = createAction(TEST);

export default (state = initialState, action) => {
  switch (action.type) {
    case TEST: {
      return {
        ...state,
        reduxTest: true
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
