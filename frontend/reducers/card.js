import { createAction, handleActions } from "redux-actions";

const dummy = [
  {
    id: 0,
    title: "서울",
    averageTemperture: true,
    lowestTemperture: true,
    highestTemperture: true,
    rainfall: true,
    snowfall: true,
    averageWindSpeed: true,
    huminity: true,
    sunnyHour: true,
    cloudy: true,
    weather: true,
    startYear: 1960,
    endYear: 2010
  },
  {
    id: 1,
    title: "대구",
    averageTemperture: true,
    lowestTemperture: true,
    highestTemperture: true,
    rainfall: true,
    snowfall: true,
    averageWindSpeed: true,
    huminity: true,
    sunnyHour: true,
    cloudy: true,
    weather: true,
    startYear: 1968,
    endYear: 2018
  }
];

export const initialState = {
  cardNumber: dummy.length,
  cards: dummy,
  location: null,
  factors: [],
  startYear: null,
  endYear: null
};

export const ADD_CARD = "ADD_CARD";
export const MODIFY_CARD_NUMBER = "MODIFY_CARD_NUMBER";
export const SELECT_LOCATION = "SELECT_LOCATION";
export const SELECT_FACTORS = "SELECT_FACTORS";
export const SELECT_ALL_FACTORS = "SELECT_ALL_FACTORS";
export const SELECT_START_YEAR = "SELECT_START_YEAR";
export const SELECT_END_YEAR = "SELECT_END_YEAR";

export const addCard = createAction(ADD_CARD, payload => payload);
export const modifyCardNumber = createAction(
  MODIFY_CARD_NUMBER,
  payload => payload
);
export const selectLocation = createAction(SELECT_LOCATION, payload => payload);

export const selectFactors = createAction(SELECT_FACTORS, payload => payload);
export const selectAllFactors = createAction(
  SELECT_ALL_FACTORS,
  payload => payload
);

export const selectStartYear = createAction(
  SELECT_START_YEAR,
  payload => payload
);

export const selectEndYear = createAction(SELECT_END_YEAR, payload => payload);

export default handleActions(
  {
    [ADD_CARD]: (state, action) => {
      const newCards = state.cards.concat();
      newCards.push(action.payload.newCard);
      return {
        ...state,
        cards: newCards,
        cardNumber: state.cards.length + 1
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
