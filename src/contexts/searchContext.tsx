import { AvailableTabs } from 'appConstants';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialSearchState, searchReducer } from 'reducers';
import {
  SearchContextProps,
  SearchActionType,
  Lengths,
  BasePokemonsData,
  BaseTypesData,
  BaseMovesData,
  Sorting,
} from 'types';

export const SearchContext = createContext<SearchContextProps>({} as SearchContextProps);

export const SearchContextProvider = ({ children }: { children: JSX.Element }) => {
  const [searchState, dispatch] = useReducer(searchReducer, initialSearchState);
  const { searchState: state } = useMemo(
    () => ({ searchState, dispatch }),
    [searchState, dispatch]
  );
  const setSorting = useCallback(
    (sorting: Sorting) => {
      dispatch({ type: SearchActionType.sorting, payload: { sorting } });
    },
    [dispatch]
  );
  const setPage = useCallback(
    (page: number) => {
      dispatch({ type: SearchActionType.page, payload: { page } });
    },
    [dispatch]
  );
  const setActiveTab = useCallback(
    (activeTab: AvailableTabs) => {
      dispatch({ type: SearchActionType.tab, payload: { activeTab } });
    },
    [dispatch]
  );
  const setIsLoading = useCallback(
    (isLoading: boolean) => {
      dispatch({ type: SearchActionType.isLoading, payload: { isLoading } });
    },
    [dispatch]
  );
  const setPokemons = useCallback(
    (pokemons: BasePokemonsData) => {
      dispatch({ type: SearchActionType.pokemons, payload: { pokemons } });
    },
    [dispatch]
  );
  const setMoves = useCallback(
    (moves: BaseMovesData) => {
      dispatch({ type: SearchActionType.moves, payload: { moves } });
    },
    [dispatch]
  );
  const setTypes = useCallback(
    (types: BaseTypesData) => {
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
      value={{
        searchState: state,
        setPage,
        setTypes,
        setMoves,
        setSorting,
        setLengths,
        setPokemons,
        setIsLoading,
        setActiveTab,
      }}
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
