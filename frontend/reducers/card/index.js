import { createAction, handleActions } from "redux-actions";
const cards = [];
export const initialState = {
  cardNumber: cards.length,
  cards: cards,
  location: null,
  factors: [],
  startYear: null,
  endYear: null,
  isCreatingCard: false
};

export const ADD_CARD_REQUEST = "ADD_CARD_REQUEST";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const ADD_CARD_FAILURE = "ADD_CARD_FAILURE";

export const CARD_LOAD_REQUEST = "CARD_LOAD_REQUEST";
export const CARD_LOAD_SUCCESS = "CARD_LOAD_SUCCESS";
export const CARD_LOAD_FAILURE = "CARD_LOAD_FAILURE";

export const CARD_EMPTY_REQUEST = "CARD_EMPTY_REQUEST";
export const CARD_EMPTY_SUCCESS = "CARD_EMPTY_SUCCESS";
export const CARD_EMPTY_FAILURE = "CARD_EMPTY_FAILURE";

export const CARD_EDIT_REQUEST = "CARD_EDIT_REQUEST";
export const CARD_EDIT_SUCCESS = "CARD_EDIT_SUCCESS";
export const CARD_EDIT_FAILURE = "CARD_EDIT_FAILURE";

export const CARD_DELETE_REQUEST = "CARD_DELETE_REQUEST";
export const CARD_DELETE_SUCCESS = "CARD_DELETE_SUCCESS";
export const CARD_DELETE_FAILURE = "CARD_DELETE_FAILURE";

export const MODIFY_CARD_NUMBER = "MODIFY_CARD_NUMBER";

export const SELECT_LOCATION = "SELECT_LOCATION";
export const SELECT_FACTORS = "SELECT_FACTORS";
export const SELECT_ALL_FACTORS = "SELECT_ALL_FACTORS";
export const SELECT_START_YEAR = "SELECT_START_YEAR";
export const SELECT_END_YEAR = "SELECT_END_YEAR";

export const FILE_DOWNLOAD_REQUEST = "FILE_DOWNLOAD_REQUEST";
export const FILE_DOWNLOAD_SUCCESS = "FILE_DOWNLOAD_SUCCESS";
export const FILE_DOWNLOAD_FAILURE = "FILE_DOWNLOAD_FAILURE";

export const addCardAction = createAction(ADD_CARD_REQUEST, payload => payload);

export const cardEditAction = createAction(
  CARD_EDIT_REQUEST,
  payload => payload
);

export const cardDeleteAction = createAction(
  CARD_DELETE_REQUEST,
  payload => payload
);

export const modifyCardNumber = createAction(
  MODIFY_CARD_NUMBER,
  payload => payload
);
export const selectLocationAction = createAction(
  SELECT_LOCATION,
  payload => payload
);

export const selectFactorsAction = createAction(
  SELECT_FACTORS,
  payload => payload
);
export const selectAllFactorsAction = createAction(
  SELECT_ALL_FACTORS,
  payload => payload
);

export const selectStartYearAction = createAction(
  SELECT_START_YEAR,
  payload => payload
);

export const selectEndYearAction = createAction(
  SELECT_END_YEAR,
  payload => payload
);

export const fileDownloadAction = createAction(
  FILE_DOWNLOAD_REQUEST,
  payload => payload
);
export default handleActions(
  {
    [ADD_CARD_REQUEST]: (state, action) => {
      return {
        ...state
      };
    },
    [ADD_CARD_SUCCESS]: (state, action) => {
      const newCards = state.cards.concat();
      newCards.push(action.payload);
      return {
        ...state,
        cards: newCards,
        cardNumber: state.cards.length + 1
      };
    },
    [ADD_CARD_FAILURE]: (state, action) => {
      return {
        ...state
      };
    },
    [CARD_EDIT_REQUEST]: (state, action) => {
      return {
        ...state
      };
    },
    [CARD_EDIT_SUCCESS]: (state, action) => {
      const newCardAfterEdit = state.cards.concat();
      newCardAfterEdit.find(target => target.id == action.payload.id).location =
        action.payload.location;
      return {
        ...state
      };
    },
    [CARD_EDIT_FAILURE]: (state, action) => {
      return {
        ...state
      };
    },
    [CARD_DELETE_REQUEST]: (state, action) => {
      return {
        ...state
      };
    },
    [CARD_DELETE_SUCCESS]: (state, action) => {
      const newCards = state.cards
        .concat()
        .filter(target => target.id != action.payload.id);
      return {
        ...state,
        cards: newCards
      };
    },
    [CARD_DELETE_FAILURE]: (state, action) => {
      return {
        ...state
      };
    },
    [CARD_LOAD_REQUEST]: (state, action) => {
      return {
        ...state
      };
    },
    [CARD_LOAD_SUCCESS]: (state, action) => {
      const newCards = state.cards.concat();
      action.payload.map(value => {
        newCards.push(value);
      });
      return {
        ...state,
        cards: newCards,
        cardNumber: state.cards.length + 1
      };
    },
    [CARD_LOAD_FAILURE]: (state, action) => {
      return {
        ...state
      };
    },
    [CARD_EMPTY_REQUEST]: (state, action) => {
      return {
        ...state
      };
    },
    [CARD_EMPTY_SUCCESS]: (state, action) => {
      return {
        ...state,
        cards: [],
        cardNumber: 0
      };
    },
    [CARD_EMPTY_FAILURE]: (state, action) => {
      return {
        ...state
      };
    },
    [FILE_DOWNLOAD_REQUEST]: (state, action) => {
      return {
        ...state
      };
    },
    [FILE_DOWNLOAD_SUCCESS]: (state, action) => {
      return {
        ...state
      };
    },
    [FILE_DOWNLOAD_FAILURE]: (state, action) => {
      return {
        ...state
      };
    },
    [SELECT_LOCATION]: (state, action) => {
      return {
        ...state,
        location: action.payload.location
      };
    },
    [SELECT_FACTORS]: (state, action) => {
      const newFactors = action.payload.factors.concat();
      return {
        ...state,
        factors: newFactors
      };
    },
    [SELECT_ALL_FACTORS]: (state, action) => {
      if (state.factors.length == 10) {
        return {
          ...state,
          factors: []
        };
      } else {
        return {
          ...state,
          factors: action.payload.allFactors.concat()
        };
      }
    },
    [SELECT_START_YEAR]: (state, action) => {
      return {
        ...state,
        startYear: action.payload.startYear
      };
    },
    [SELECT_END_YEAR]: (state, action) => {
      return {
        ...state,
        endYear: action.payload.endYear
      };
    }
  },
  initialState
);
