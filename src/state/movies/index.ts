import { Actions, State } from "./types";

const append = <T>(existing: T[] | undefined, next: T[]): T[] =>
  existing?.length ? [...existing, ...next] : next;

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "GET_NETFLIX":
      return { ...state, netflix: action.payload };
    case "SET_NETFLIX":
      return { ...state, netflix: append(state.netflix, action.payload) };
    case "GET_TRENDING":
      return { ...state, trending: action.payload };
    case "GET_TOP_RATED":
      return { ...state, topRated: action.payload };
    case "GET_ACTION_MOVIES":
      return { ...state, actionMovies: action.payload };
    case "SET_ACTION_MOVIES":
      return { ...state, actionMovies: append(state.actionMovies, action.payload) };
    case "GET_COMEDY_MOVIES":
      return { ...state, comedyMovies: action.payload };
    case "SET_COMEDY_MOVIES":
      return { ...state, comedyMovies: append(state.comedyMovies, action.payload) };
    case "GET_HORROR_MOVIES":
      return { ...state, horrorMovies: action.payload };
    case "SET_HORROR_MOVIES":
      return { ...state, horrorMovies: append(state.horrorMovies, action.payload) };
    case "GET_ROMANCE_MOVIES":
      return { ...state, romanceMovies: action.payload };
    case "SET_ROMANCE_MOVIES":
      return { ...state, romanceMovies: append(state.romanceMovies, action.payload) };
    case "GET_DOCUMENTARIES":
      return { ...state, documentaries: action.payload };
    case "SET_DOCUMENTARIES":
      return { ...state, documentaries: append(state.documentaries, action.payload) };
    default:
      return state;
  }
};
