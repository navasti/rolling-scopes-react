import { AvailableTabs, Limits } from 'appConstants';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import {
  CurrentPageResults,
  AllDataResults,
  SearchResults,
  CustomPokemon,
  ResultsAmount,
  CurrentPage,
  BaseData,
  Sorting,
  PokemonSorting,
  MoveSorting,
  TypeSorting,
  MoveBaseData,
  PokemonMoveDetails,
  PokemonBaseData,
  PokemonDetails,
  TypeBaseData,
  PokemonTypeDetails,
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

// ujednolicic obiekty przy mutacjach

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
  basePokemons: PokemonBaseData | null;
  currentMoves: PokemonMoveDetails[];
  currentTypes: PokemonTypeDetails[];
  currentPokemons: PokemonDetails[];
  baseMoves: MoveBaseData | null;
  baseTypes: TypeBaseData | null;
  allMoves: PokemonMoveDetails[];
  allTypes: PokemonTypeDetails[];
  allPokemons: PokemonDetails[];
  searchResults: SearchResults;
  currentPage: CurrentPage;
  sorting: Sorting;
}>;

export const globalReducer = (state: State, action: GlobalAction) => {
  const { payload, type } = action;
  switch (type) {
    case GlobalActionType.setAllData:
      const { allData } = payload;
      console.log('all data to set ', allData);
      return {
        ...state,
        isLoading: false,
        sorting: {
          pokemons: allData?.sorting?.pokemons || PokemonSorting.none,
          moves: allData?.sorting?.moves || MoveSorting.none,
          types: allData?.sorting?.types || TypeSorting.none,
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
        baseData: {
          pokemons: allData?.basePokemons || state.baseData.pokemons,
          moves: allData?.baseMoves || state.baseData.moves,
          types: allData?.baseTypes || state.baseData.types,
        },
        currentPage: {
          pokemons: allData?.currentPage?.pokemons || 1,
          moves: allData?.currentPage?.moves || 1,
          types: allData?.currentPage?.types || 1,
        },
        searchResults: {
          pokemons: allData?.searchResults?.pokemons || [],
          moves: allData?.searchResults?.moves || [],
          types: allData?.searchResults?.types || [],
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
