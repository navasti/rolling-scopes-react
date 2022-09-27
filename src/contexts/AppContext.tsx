import { activeTabReducer, initialState, formReducer, loadingReducer, dataReducer } from 'reducers';
import { createContext, Dispatch, useCallback, useContext, useReducer } from 'react';
import { GlobalState, Actions, PayloadTypes } from 'types';

const AppContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Actions>;
  setIsLoading: (isLoading: boolean) => void;
}>({
  state: initialState,
  setIsLoading: () => {},
  dispatch: () => {},
});

const mainReducer = (state: GlobalState, action: Actions) => {
  const { activeTab, customPokemons, isLoading } = state;
  return {
    ...state,
    ...dataReducer(state, action),
    customPokemons: formReducer(customPokemons, action),
    activeTab: activeTabReducer(activeTab, action),
    isLoading: loadingReducer(isLoading, action),
  };
};

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const setIsLoading = useCallback(
    (isLoading: boolean) => dispatch({ type: PayloadTypes.loading, payload: isLoading }),
    [dispatch]
  );
  return (
    <AppContext.Provider value={{ state, setIsLoading, dispatch }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppContext');
  } else return context;
};
