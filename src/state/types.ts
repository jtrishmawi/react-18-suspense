import {
  Actions as MoviesActions,
  DispatchActions as MoviesDispatchActions,
  DispatchEpics as MoviesDispatchEpics,
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

export interface DispatchEpics {
  movies: MoviesDispatchEpics;
}

export type Actions = MoviesActions;
