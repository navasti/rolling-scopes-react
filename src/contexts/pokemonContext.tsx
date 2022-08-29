import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialPokemonState, pokemonReducer } from 'reducers';
import {
  PokemonSorting,
  PokemonDetails,
  PokemonBaseData,
  PokemonActionType,
  PokemonContextProps,
} from 'types';

export const PokemonContext = createContext<PokemonContextProps>({} as PokemonContextProps);

export const PokemonContextProvider = ({ children }: { children: JSX.Element }) => {
  const [pokemonState, dispatch] = useReducer(pokemonReducer, initialPokemonState);
  const { pokemonState: state } = useMemo(
    () => ({ pokemonState, dispatch }),
    [pokemonState, dispatch]
  );
  const setResultsAmount = useCallback(
    (resultsAmount: number) => {
      dispatch({
        type: PokemonActionType.setResultsAmount,
        payload: { resultsAmount },
      });
    },
    [dispatch]
  );
  const setSearchResults = useCallback(
    (searchResults: Array<PokemonDetails> | null) => {
      dispatch({
        type: PokemonActionType.setSearchResults,
        payload: { searchResults },
      });
    },
    [dispatch]
  );
  const setCurrentPageResults = useCallback(
    (currentPageResults: Array<PokemonDetails>) => {
      dispatch({
        type: PokemonActionType.setCurrentPageResults,
        payload: { currentPageResults },
      });
    },
    [dispatch]
  );
  const setAllDataResults = useCallback(
    (allDataResults: Array<PokemonDetails>) => {
      dispatch({
        type: PokemonActionType.setAllDataResults,
        payload: { allDataResults },
      });
    },
    [dispatch]
  );
  const setSorting = useCallback(
    (sorting: PokemonSorting) => {
      dispatch({
        type: PokemonActionType.setSorting,
        payload: { sorting },
      });
    },
    [dispatch]
  );
  const setCurrentPage = useCallback(
    (currentPage: number) => {
      dispatch({
        type: PokemonActionType.setCurrentPage,
        payload: { currentPage },
      });
    },
    [dispatch]
  );
  const setBaseData = useCallback(
    (baseData: PokemonBaseData) => {
      dispatch({
        type: PokemonActionType.setBaseData,
        payload: { baseData },
      });
    },
    [dispatch]
  );
  return (
    <PokemonContext.Provider
      value={{
        pokemonState: state,
        setCurrentPageResults,
        setAllDataResults,
        setResultsAmount,
        setSearchResults,
        setCurrentPage,
        setBaseData,
        setSorting,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemonContext must be used within PokemonContext');
  } else return context;
};
