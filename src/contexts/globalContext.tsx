import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { AvailableTabs, Limits } from 'appConstants';
import {
  CurrentPageResults,
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonBaseData,
  AllDataResults,
  PokemonSorting,
  PokemonDetails,
  SearchResults,
  CustomPokemon,
  ResultsAmount,
  MoveBaseData,
  TypeBaseData,
  TypeSorting,
  MoveSorting,
  CurrentPage,
  BaseData,
  Sorting,
} from 'types';

export type State = {
  customPokemons: Array<CustomPokemon & { id: string }>;
  currentPageResults: CurrentPageResults;
  allDataResults: AllDataResults;
  searchResults: SearchResults;
  resultsAmount: ResultsAmount;
  currentPage: CurrentPage;
  activeTab: AvailableTabs;
  baseData: BaseData;
  isLoading: boolean;
  sorting: Sorting;
};

export type GlobalContextProps = {
  setAllData: (allData: AllData) => void;
  state: State;
};

const initialState: State = {
  activeTab: AvailableTabs.pokemons,
  customPokemons: [],
  isLoading: true,
  resultsAmount: {
    pokemons: Limits.pokemon,
    types: Limits.type,
    moves: Limits.move,
  },
  sorting: {
    pokemons: PokemonSorting.none,
    moves: MoveSorting.none,
    types: TypeSorting.none,
  },
  currentPageResults: {
    pokemons: [],
    moves: [],
    types: [],
  },
  searchResults: {
    pokemons: [],
    moves: [],
    types: [],
  },
  allDataResults: {
    pokemons: [],
    moves: [],
    types: [],
  },
  baseData: {
    pokemons: null,
    moves: null,
    types: null,
  },
  currentPage: {
    pokemons: 1,
    moves: 1,
    types: 1,
  },
};

enum GlobalActionType {
  setAllData = 'allData',
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type GlobalAction = {
  type: GlobalActionType;
  payload: RecursivePartial<State> & {
    allData?: AllData;
  };
};

type AllData = Partial<{
  searchResults: Partial<SearchResults>;
  resultsAmount: Partial<ResultsAmount>;
  basePokemons: PokemonBaseData | null;
  currentMoves: PokemonMoveDetails[];
  currentTypes: PokemonTypeDetails[];
  currentPokemons: PokemonDetails[];
  currentPage: Partial<CurrentPage>;
  baseMoves: MoveBaseData | null;
  baseTypes: TypeBaseData | null;
  allMoves: PokemonMoveDetails[];
  allTypes: PokemonTypeDetails[];
  allPokemons: PokemonDetails[];
  sorting: Partial<Sorting>;
  activeTab: AvailableTabs;
}>;

export const globalReducer = (state: State, action: GlobalAction) => {
  const { payload, type } = action;
  switch (type) {
    case GlobalActionType.setAllData:
      const { allData } = payload;
      return {
        ...state,
        isLoading: false,
        activeTab: allData?.activeTab || state.activeTab,
        sorting: {
          pokemons: allData?.sorting?.pokemons || state.sorting.pokemons,
          moves: allData?.sorting?.moves || state.sorting.moves,
          types: allData?.sorting?.types || state.sorting.types,
        },
        allDataResults: {
          pokemons: allData?.allPokemons || state.allDataResults.pokemons,
          moves: allData?.allMoves || state.allDataResults.moves,
          types: allData?.allTypes || state.allDataResults.types,
        },
        currentPageResults: {
          pokemons: allData?.currentPokemons || state.currentPageResults.pokemons,
          moves: allData?.currentMoves || state.currentPageResults.moves,
          types: allData?.currentTypes || state.currentPageResults.types,
        },
        resultsAmount: {
          pokemons: allData?.resultsAmount?.pokemons || state.resultsAmount.pokemons,
          moves: allData?.resultsAmount?.moves || state.resultsAmount.moves,
          types: allData?.resultsAmount?.types || state.resultsAmount.types,
        },
        baseData: {
          pokemons: allData?.basePokemons || state.baseData.pokemons,
          moves: allData?.baseMoves || state.baseData.moves,
          types: allData?.baseTypes || state.baseData.types,
        },
        currentPage: {
          pokemons: allData?.currentPage?.pokemons || state.currentPage.pokemons,
          moves: allData?.currentPage?.moves || state.currentPage.moves,
          types: allData?.currentPage?.types || state.currentPage.types,
        },
        searchResults: {
          pokemons: allData?.searchResults?.pokemons || state.searchResults.pokemons,
          moves: allData?.searchResults?.moves || state.searchResults.moves,
          types: allData?.searchResults?.types || state.searchResults.types,
        },
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

export const GlobalContextProvider = ({ children }: { children: JSX.Element }) => {
  const [globalState, dispatch] = useReducer(globalReducer, initialState);
  const { globalState: state } = useMemo(
    () => ({ globalState, dispatch }),
    [globalState, dispatch]
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

  return <GlobalContext.Provider value={{ state, setAllData }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within GlobalContext');
  } else return context;
};
