import { Actions, State } from "./types";

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "GET_NETFLIX":
      return {
        ...state,
        netflix: action.payload,
      };
    case "SET_NETFLIX":
      return {
        ...state,
        netflix: state.netflix?.length
          ? [...state.netflix, ...action.payload]
          : action.payload,
      };
    case "GET_TRENDING":
      return {
        ...state,
        trending: action.payload,
      };
    case "GET_TOP_RATED":
      return {
        ...state,
        topRated: action.payload,
      };
    case "GET_ACTION_MOVIES":
      return {
        ...state,
        actionMovies: action.payload,
      };
    case "GET_COMEDY_MOVIES":
      return {
        ...state,
        comedyMovies: action.payload,
      };
    case "GET_HORROR_MOVIES":
      return {
        ...state,
        horrorMovies: action.payload,
      };
    case "GET_ROMANCE_MOVIES":
      return {
        ...state,
        romanceMovies: action.payload,
      };
    case "GET_DOCUMENTARIES":
      return {
        ...state,
        documentaries: action.payload,
      };
    default:
      return state;
  }
};
