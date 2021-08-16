import { Dispatch } from "react";
import { Actions } from "./types";
import { epics as moviesEpics } from "./movies/epics";
import Api from "../helpers/api";

export const epics = (actions: Dispatch<Actions>, api: Api) => ({
  movies: moviesEpics(actions, api),
});
