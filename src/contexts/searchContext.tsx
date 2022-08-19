import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialSearchState, searchReducer } from 'reducers';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  SearchContextProps,
  SearchActionType,
  PokemonDetails,
  Lengths,
} from 'types';

export const SearchContext = createContext<SearchContextProps>({} as SearchContextProps);

export const SearchContextProvider = ({ children }: { children: JSX.Element }) => {
  const [searchState, dispatch] = useReducer(searchReducer, initialSearchState);
  const { searchState: state } = useMemo(
    () => ({ searchState, dispatch }),
    [searchState, dispatch]
  );
  const setIsLoading = useCallback(
    (isLoading: boolean) => {
      dispatch({ type: SearchActionType.isLoading, payload: { isLoading } });
    },
    [dispatch]
  );
  const setPokemons = useCallback(
    (pokemons: Array<PokemonDetails>) => {
      dispatch({ type: SearchActionType.pokemons, payload: { pokemons } });
    },
    [dispatch]
  );
  const setMoves = useCallback(
    (moves: Array<PokemonMoveDetails>) => {
      dispatch({ type: SearchActionType.moves, payload: { moves } });
    },
    [dispatch]
  );
  const setTypes = useCallback(
    (types: Array<PokemonTypeDetails>) => {
      dispatch({ type: SearchActionType.types, payload: { types } });
    },
    [dispatch]
  );
  const setLengths = useCallback(
    (lengths: Lengths) => {
      dispatch({ type: SearchActionType.lengths, payload: { lengths } });
    },
    [dispatch]
  );
  return (
    <SearchContext.Provider
      value={{ searchState: state, setTypes, setMoves, setLengths, setPokemons, setIsLoading }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within SearchContext');
  } else return context;
};
