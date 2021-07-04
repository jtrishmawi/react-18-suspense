import { createContext, useMemo, useContext, useReducer } from "react";
import Api from "../helpers/api";
import { actions } from "./actions";
import { reducer } from "./reducer";
import { DispatchActions, State } from "./types";

const initialState = {
  movies: {
    netflix: [],
    trending: [],
  },
} as State;

const AppContext = createContext<{
  state: State;
  actions: DispatchActions;
}>({ state: initialState, actions: {} as DispatchActions });

export const withData = (WrappedComponent: React.ComponentType<{}>) => {
  const AppContextProvider = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchedActions = actions(
      dispatch,
      useMemo(() => new Api(), [])
    );

    return (
      <AppContext.Provider value={{ state, actions: dispatchedActions }}>
        <WrappedComponent />
      </AppContext.Provider>
    );
  };

  return AppContextProvider;
};

export const useData = () => useContext(AppContext);
