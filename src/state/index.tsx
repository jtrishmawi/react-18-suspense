import { createContext, useMemo, useContext, useReducer } from "react";
import Api from "../helpers/api";
import { actions } from "./actions";
import { epics } from "./epics";
import { reducer } from "./reducer";
import { DispatchActions, DispatchEpics, State } from "./types";

const initialState = {
  movies: {},
} as State;

const AppContext = createContext<{
  state: State;
  actions: DispatchActions;
  $actions: DispatchEpics;
}>({
  state: initialState,
  actions: {} as DispatchActions,
  $actions: {} as DispatchEpics,
});

export const withData = (WrappedComponent: React.ComponentType<{}>) => {
  const AppContextProvider = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const api = useMemo(() => new Api(), []);
    const dispatchedActions = actions(dispatch, api);
    const dispatchedEpics = epics(dispatch, api);

    return (
      <AppContext.Provider
        value={{ state, actions: dispatchedActions, $actions: dispatchedEpics }}
      >
        <WrappedComponent />
      </AppContext.Provider>
    );
  };

  return AppContextProvider;
};

export const useData = () => useContext(AppContext);
