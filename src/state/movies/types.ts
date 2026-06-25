import { Observable } from "rxjs";
import { MovieListObject, TvListResultObject } from "../../helpers/api";
import { ActionMap } from "../types";

/**
 * The shape of the movies slice of the global state tree.
 *
 * Every property is optional (?) because the data arrives asynchronously —
 * before the first API call resolves, these are all undefined.
 *
 * Think of this as a snapshot of "what the app currently knows about movies".
 */
export interface State {
  netflix?: TvListResultObject[];    // TV shows available on Netflix
  trending?: MovieListObject[];       // Movies trending right now
  topRated?: MovieListObject[];       // Highest-rated movies of all time
  actionMovies?: MovieListObject[];   // Movies in the Action genre
  comedyMovies?: MovieListObject[];   // Movies in the Comedy genre
  horrorMovies?: MovieListObject[];   // Movies in the Horror genre
  romanceMovies?: MovieListObject[];  // Movies in the Romance genre
  documentaries?: MovieListObject[];  // Documentary films
}

/**
 * A map of every action type string → the data (payload) it carries.
 *
 * This is the "vocabulary" of things that can happen to the movies state.
 * Each key is an action name; its value type is what gets sent along with it.
 *
 * Example: dispatching "GET_TRENDING" sends back a list of MovieListObject.
 * ActionMap (defined in ../types) then turns this into a discriminated union
 * so TypeScript knows exactly what payload to expect for each action type.
 *
 * SET_NETFLIX   → called by the reducer to store the fetched Netflix list
 * GET_*         → called by epics after a successful API response
 */
export type Payload = {
  ["SET_NETFLIX"]: TvListResultObject[];
  ["GET_NETFLIX"]: TvListResultObject[];
  ["GET_TRENDING"]: MovieListObject[];
  ["GET_TOP_RATED"]: MovieListObject[];
  ["GET_ACTION_MOVIES"]: MovieListObject[];
  ["SET_ACTION_MOVIES"]: MovieListObject[];
  ["GET_COMEDY_MOVIES"]: MovieListObject[];
  ["SET_COMEDY_MOVIES"]: MovieListObject[];
  ["GET_HORROR_MOVIES"]: MovieListObject[];
  ["SET_HORROR_MOVIES"]: MovieListObject[];
  ["GET_ROMANCE_MOVIES"]: MovieListObject[];
  ["SET_ROMANCE_MOVIES"]: MovieListObject[];
  ["GET_DOCUMENTARIES"]: MovieListObject[];
  ["SET_DOCUMENTARIES"]: MovieListObject[];
};

/**
 * The actions that a component can call directly.
 *
 * These are plain synchronous dispatches — they fire an action into the
 * reducer/epic pipeline without needing to know how data is fetched.
 * Components call these and the epics take care of the rest.
 *
 * Example usage inside a component:
 *   const { actions: { movies: { getTrending } } } = useData();
 *   useEffect(() => { getTrending(); }, []);
 */
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

/**
 * Epic actions — prefixed with $ to distinguish them from plain actions.
 *
 * Epics are side-effect handlers built with RxJS. When a component calls
 * getNetflix(), an epic intercepts it, calls the TMDB API, and dispatches
 * the result back into the reducer.
 *
 * The $ prefix is a convention meaning "this triggers async work".
 * Components never call these directly — they are wired up internally
 * by the state system (see state/movies/epics.ts).
 *
 * $getNetflix takes { page } because Netflix results are paginated.
 * All others fetch a fixed first page so they need no arguments.
 */
export interface DispatchEpics {
  $getNetflix: ({ page }: { page: number }) => void;
  $getTrending: ({ page }: { page: number }) => void;
  $getTopRated: ({ page }: { page: number }) => void;
  $getActionMovies: ({ page }: { page: number }) => void;
  $getComedyMovies: ({ page }: { page: number }) => void;
  $getHorrorMovies: ({ page }: { page: number }) => void;
  $getRomanceMovies: ({ page }: { page: number }) => void;
  $getDocumentaries: ({ page }: { page: number }) => void;
}

/**
 * A discriminated union of every possible action object.
 *
 * ActionMap<Payload> converts the Payload map into objects like:
 *   { type: "GET_TRENDING"; payload: MovieListObject[] }
 *   { type: "GET_TOP_RATED"; payload: MovieListObject[] }
 *   ...
 *
 * [keyof ActionMap<Payload>] then collapses all of those into one union type.
 * This means the reducer's switch statement is fully type-safe — TypeScript
 * will tell you if you handle a case that doesn't exist, or miss one that does.
 */
export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
