import cardReducer, { ADD_CARD_SUCCESS } from "./index";

describe("Posts Reducer", () => {
  it("default state가 리턴된다.", () => {
    const newState = cardReducer(undefined, {});
    const cards = [];
    expect(newState).toEqual({
      cardNumber: cards.length,
      cards: cards,
      location: null,
      factors: [],
      startYear: null,
      endYear: null,
      isCreatingCard: false
    });
  });

  it("카드 추가 액션에 성공한다..", async () => {
    const cards = [];
    const addCardDummy = {
      location: "testLocation",
      factors: ["testFactor1", "testFactor2"],
      startYear: 2012,
      endYear: 2019,
      isCreatingCard: false
    };
    const expectedState = {
      cardNumber: cards.length + 1,
      cards: cards.concat(addCardDummy),
      location: null,
      factors: [],
      startYear: null,
      endYear: null,
      isCreatingCard: false
    };

    const newState = cardReducer(undefined, {
      type: ADD_CARD_SUCCESS,
      payload: addCardDummy
    });
    expect(newState).toEqual(expectedState);
  });
});
