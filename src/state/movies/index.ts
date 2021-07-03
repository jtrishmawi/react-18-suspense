import { Actions, State } from "./types";

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "GET_NETFLIX":
      return {
        ...state,
        netflix: action.payload,
      };
    case "GET_TRENDING":
      return {
        ...state,
        trending: action.payload,
      };
    default:
      return state;
  }
};
