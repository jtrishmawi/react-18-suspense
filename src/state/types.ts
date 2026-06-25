import {
  Actions as MoviesActions,
  DispatchActions as MoviesDispatchActions,
  DispatchEpics as MoviesDispatchEpics,
  Payload as MoviesPayload,
  State as MoviesState,
} from "./movies/types";

/**
 * Named building blocks for action objects.
 *
 * Splitting into two named types (instead of an inline ternary) makes the
 * shapes self-documenting and reusable — e.g. in test helpers or middleware.
 *
 * `readonly` prevents accidental mutation after dispatch:
 *   action.type = "other"  // ❌ TypeScript error
 */
type ActionWithPayload<T extends string, P> = { readonly type: T; readonly payload: P };
type ActionWithoutPayload<T extends string> = { readonly type: T };

/**
 * ActionMap is a generic utility type that converts a payload map into a
 * discriminated union of action objects — the standard Redux-style pattern.
 *
 * How it works, step by step:
 *
 *   Given a map like:
 *     { "GET_TRENDING": MovieListObject[]; "GET_TOP_RATED": MovieListObject[] }
 *
 *   ActionMap produces:
 *     {
 *       GET_TRENDING:  { readonly type: "GET_TRENDING";  readonly payload: MovieListObject[] }
 *       GET_TOP_RATED: { readonly type: "GET_TOP_RATED"; readonly payload: MovieListObject[] }
 *     }
 *
 * The conditional type handles the special case where an action carries no
 * payload (M[Key] extends undefined) — those actions only have a `type` field.
 *
 * You then extract the union with: ActionMap<Payload>[keyof ActionMap<Payload>]
 * which gives you every possible action object as a single type.
 *
 * Generic parameter:
 *   M — Record<string, unknown>: keys are action type strings, values are
 *       payload types. `unknown` (vs the old `any`) keeps payloads opaque
 *       until narrowed, catching accidental misuse at compile time.
 *
 * keyof M & string:
 *   `keyof` alone yields string | number | symbol. The `& string` intersection
 *   narrows it to string-only keys, matching what action type names always are.
 */
export type ActionMap<M extends Record<string, unknown>> = {
  [Key in keyof M & string]: M[Key] extends undefined
    ? ActionWithoutPayload<Key>
    : ActionWithPayload<Key, M[Key]>;
};

/**
 * The complete global state tree for the entire application.
 *
 * Each property groups a domain's state together. Right now there is only
 * one domain (movies), but the pattern scales — adding a "user" feature
 * would just mean adding `user: UserState` here and a matching slice.
 *
 * Components read from this via useData():
 *   const { state: { movies } } = useData();
 */
export interface State {
  movies: MoviesState;
}

/**
 * The union of all payload types across every domain.
 *
 * Currently this is just MoviesPayload, but if a second domain were added
 * you would write: export type Payload = MoviesPayload | UserPayload;
 *
 * This is used internally by the root reducer to type-check dispatched actions.
 */
export type Payload = MoviesPayload;

/**
 * All component-callable actions, grouped by domain.
 *
 * This is what components receive from useData() under the `actions` key:
 *   const { actions: { movies: { getTrending } } } = useData();
 *
 * Each domain object maps action names to zero-argument void functions.
 * Components call them like event handlers — fire and forget.
 */
export interface DispatchActions {
  movies: MoviesDispatchActions;
}

/**
 * All epic (async/side-effect) actions, grouped by domain.
 *
 * Epics are RxJS-powered handlers that intercept plain actions, call APIs,
 * and dispatch results back into the reducer. The $ prefix signals that
 * these trigger async work and are NOT called directly by components.
 *
 * They are exposed here so the state system can wire them up internally.
 */
export interface DispatchEpics {
  movies: MoviesDispatchEpics;
}

/**
 * The union of every possible action object in the entire app.
 *
 * The root reducer's `dispatch` function accepts this type, so TypeScript
 * guarantees you can only dispatch actions that actually exist.
 *
 * Combining multiple domains: Actions = MoviesActions | UserActions | ...
 */
export type Actions = MoviesActions;
