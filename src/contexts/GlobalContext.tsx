import { AllData, CustomPokemon, GlobalActionType, GlobalContextProps } from 'types';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { globalReducer, initialState } from 'reducers';

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

export const GlobalContextProvider = ({ children }: { children: JSX.Element }) => {
  const [globalState, dispatch] = useReducer(globalReducer, initialState);
  const { globalState: state } = useMemo(
    () => ({ globalState, dispatch }),
    [globalState, dispatch]
  );
  const addCustomPokemon = useCallback(
    (customPokemon: CustomPokemon & { id: string }) => {
      dispatch({
        type: GlobalActionType.customPokemonForm,
        payload: {
          customPokemons: [customPokemon],
        },
      });
    },
    [dispatch]
  );
  const setAllData = useCallback(
    (allData: AllData) => {
      dispatch({
        type: GlobalActionType.setAllData,
        payload: { allData },
      });
    },
    [dispatch]
  );

  return (
    <GlobalContext.Provider value={{ state, setAllData, addCustomPokemon }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within GlobalContext');
  } else return context;
};
