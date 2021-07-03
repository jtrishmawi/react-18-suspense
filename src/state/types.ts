import {
  Actions as MoviesActions,
  DispatchActions as MoviesDispatchActions,
  Payload as MoviesPayload,
  State as MoviesState,
} from "./movies/types";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface State {
  movies: MoviesState;
}

export type Payload = MoviesPayload;

export interface DispatchActions {
  movies: MoviesDispatchActions;
}

export type Actions = MoviesActions;
