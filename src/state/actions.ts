import { Dispatch } from "react";
import { Actions } from "./types";
import { actions as moviesActions } from "./movies/actions";
import Api from "../helpers/api";

export const actions = (dispatch: Dispatch<Actions>, api: Api) => ({
  movies: moviesActions(dispatch, api),
});
