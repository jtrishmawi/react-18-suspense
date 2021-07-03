import { MovieListObject, TvListResultObject } from "../../helpers/api";
import { ActionMap } from "../types";

export interface State {
  netflix: TvListResultObject[];
  trending: MovieListObject[];
}

export type Payload = {
  ["GET_NETFLIX"]: TvListResultObject[];
  ["GET_TRENDING"]: MovieListObject[];
};

export interface DispatchActions {
  getNetflix: () => void;
  getTrending: () => void;
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
