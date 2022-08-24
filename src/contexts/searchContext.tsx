import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialSearchState, searchReducer } from 'reducers';
import { AvailableTabs } from 'appConstants';
import {
  SearchContextProps,
  PokemonTypeDetails,
  PokemonMoveDetails,
  SearchActionType,
  BasePokemonsData,
  BaseSortingData,
  PokemonsSorting,
  PokemonDetails,
  BaseMovesData,
  BaseTypesData,
  TypesSorting,
  MovesSorting,
  Lengths,
} from 'types';

export const SearchContext = createContext<SearchContextProps>({} as SearchContextProps);

export const SearchContextProvider = ({ children }: { children: JSX.Element }) => {
  const [searchState, dispatch] = useReducer(searchReducer, initialSearchState);
  const { searchState: state } = useMemo(
    () => ({ searchState, dispatch }),
    [searchState, dispatch]
  );
  const setCurrentPokemonResults = useCallback(
    (currentPokemonResults: Array<PokemonDetails>) => {
      dispatch({
        type: SearchActionType.currentPokemonResults,
        payload: { currentPokemonResults },
      });
    },
    [dispatch]
  );
  const setCurrentMoveResults = useCallback(
    (currentMoveResults: Array<PokemonMoveDetails>) => {
      dispatch({
        type: SearchActionType.currentMoveResults,
        payload: { currentMoveResults },
      });
    },
    [dispatch]
  );
  const setCurrentTypeResults = useCallback(
    (currentTypeResults: Array<PokemonTypeDetails>) => {
      dispatch({
        type: SearchActionType.currentTypeResults,
        payload: { currentTypeResults },
      });
    },
    [dispatch]
  );
  const setSortingData = useCallback(
    (sortingData: BaseSortingData) => {
      dispatch({ type: SearchActionType.sortingData, payload: { sortingData } });
    },
    [dispatch]
  );
  const setMovesSorting = useCallback(
    (movesSorting: MovesSorting) => {
      dispatch({ type: SearchActionType.movesSorting, payload: { movesSorting } });
    },
    [dispatch]
  );
  const setTypesSorting = useCallback(
    (typesSorting: TypesSorting) => {
      dispatch({ type: SearchActionType.typesSorting, payload: { typesSorting } });
    },
    [dispatch]
  );
  const setPokemonsSorting = useCallback(
    (pokemonsSorting: PokemonsSorting) => {
      dispatch({ type: SearchActionType.pokemonsSorting, payload: { pokemonsSorting } });
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
        setLengths,
        setPokemons,
        setIsLoading,
        setActiveTab,
        setSortingData,
        setMovesSorting,
        setTypesSorting,
        setPokemonsSorting,
        setCurrentTypeResults,
        setCurrentMoveResults,
        setCurrentPokemonResults,
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
