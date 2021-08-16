import { Observable } from "rxjs";
import { MovieListObject, TvListResultObject } from "../../helpers/api";
import { ActionMap } from "../types";

export interface State {
  netflix?: TvListResultObject[];
  trending?: MovieListObject[];
  topRated?: MovieListObject[];
  actionMovies?: MovieListObject[];
  comedyMovies?: MovieListObject[];
  horrorMovies?: MovieListObject[];
  romanceMovies?: MovieListObject[];
  documentaries?: MovieListObject[];
}

export type Payload = {
  ["SET_NETFLIX"]: TvListResultObject[];
  ["GET_NETFLIX"]: TvListResultObject[];
  ["GET_TRENDING"]: MovieListObject[];
  ["GET_TOP_RATED"]: MovieListObject[];
  ["GET_ACTION_MOVIES"]: MovieListObject[];
  ["GET_COMEDY_MOVIES"]: MovieListObject[];
  ["GET_HORROR_MOVIES"]: MovieListObject[];
  ["GET_ROMANCE_MOVIES"]: MovieListObject[];
  ["GET_DOCUMENTARIES"]: MovieListObject[];
};

export interface DispatchActions {
  getNetflix: () => void;
  getTrending: () => void;
  getTopRated: () => void;
  getActionMovies: () => void;
  getComedyMovies: () => void;
  getHorrorMovies: () => void;
  getRomanceMovies: () => void;
  getDocumentaries: () => void;
}
export interface DispatchEpics {
  $getNetflix: ({ page }: { page: number }) => void;
  $getTrending: () => void;
  $getTopRated: () => void;
  $getActionMovies: () => void;
  $getComedyMovies: () => void;
  $getHorrorMovies: () => void;
  $getRomanceMovies: () => void;
  $getDocumentaries: () => void;
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
