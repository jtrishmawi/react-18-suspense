import { Actions, State } from "./types";
import { Actions as MoviesActions } from "./movies/types";
import { reducer as moviesReducer } from "./movies";

export const reducer = ({ movies }: State, action: Actions) => ({
  movies: moviesReducer(movies, action as MoviesActions),
});
