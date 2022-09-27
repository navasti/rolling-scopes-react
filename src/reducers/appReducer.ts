import { AvailableTabs, Limits } from 'appConstants';
import { baseDataChecker } from 'utils';
import {
  Actions,
  GlobalState,
  MoveSorting,
  TypeSorting,
  PayloadTypes,
  CustomPokemon,
  PokemonSorting,
} from 'types';

export const initialState: GlobalState = {
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
    pokemons: null,
    moves: null,
    types: null,
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

export const loadingReducer = (state: boolean, action: Actions) => {
  switch (action.type) {
    case PayloadTypes.loading:
      return action.payload;
    default:
      return state;
  }
};

export const formReducer = (state: Array<CustomPokemon & { id: string }>, action: Actions) => {
  switch (action.type) {
    case PayloadTypes.formPokemons:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const activeTabReducer = (state: AvailableTabs, action: Actions) => {
  switch (action.type) {
    case PayloadTypes.activeTab:
      return action.payload;
    default:
      return state;
  }
};

export const dataReducer = (state: GlobalState, action: Actions) => {
  switch (action.type) {
    case PayloadTypes.searchData:
      return { ...action.payload };
    case PayloadTypes.currentData:
      return { ...action.payload };
    case PayloadTypes.currentParamData:
      return { ...action.payload };
    case PayloadTypes.pokemonsPagination:
      return {
        currentPageResults: {
          ...state.currentPageResults,
          pokemons: action.payload.currentPokemons,
        },
        currentPage: {
          ...state.currentPage,
          pokemons: action.payload.currentPage,
        },
        baseData: {
          ...state.baseData,
          pokemons: baseDataChecker(state.baseData.pokemons, action.payload.basePokemons),
        },
      };
    case PayloadTypes.typesPagination:
      return {
        currentPageResults: {
          ...state.currentPageResults,
          types: action.payload.currentTypes,
        },
        currentPage: {
          ...state.currentPage,
          types: action.payload.currentPage,
        },
        baseData: {
          ...state.baseData,
          types: baseDataChecker(state.baseData.types, action.payload.baseTypes),
        },
      };
    case PayloadTypes.movesPagination:
      return {
        currentPageResults: {
          ...state.currentPageResults,
          moves: action.payload.currentMoves,
        },
        currentPage: {
          ...state.currentPage,
          moves: action.payload.currentPage,
        },
        baseData: {
          ...state.baseData,
          moves: baseDataChecker(state.baseData.moves, action.payload.baseMoves),
        },
      };
    case PayloadTypes.pokemonResults:
      return {
        currentPageResults: {
          ...state.currentPageResults,
          pokemons: action.payload.currentPokemons,
        },
        resultsAmount: {
          ...state.resultsAmount,
          pokemons: action.payload.resultsAmount,
        },
        currentPage: {
          ...state.currentPage,
          pokemons: action.payload.currentPage,
        },
        baseData: {
          ...state.baseData,
          pokemons: baseDataChecker(state.baseData.pokemons, action.payload.basePokemons),
        },
      };
    case PayloadTypes.moveResults:
      return {
        currentPageResults: {
          ...state.currentPageResults,
          moves: action.payload.currentMoves,
        },
        resultsAmount: {
          ...state.resultsAmount,
          moves: action.payload.resultsAmount,
        },
        currentPage: {
          ...state.currentPage,
          moves: action.payload.currentPage,
        },
        baseData: {
          ...state.baseData,
          moves: baseDataChecker(state.baseData.moves, action.payload.baseMoves),
        },
      };
    case PayloadTypes.typeResults:
      return {
        currentPageResults: {
          ...state.currentPageResults,
          types: action.payload.currentTypes,
        },
        resultsAmount: {
          ...state.resultsAmount,
          types: action.payload.resultsAmount,
        },
        currentPage: {
          ...state.currentPage,
          types: action.payload.currentPage,
        },
        baseData: {
          ...state.baseData,
          types: baseDataChecker(state.baseData.types, action.payload.baseTypes),
        },
      };
    case PayloadTypes.sortingPokemon:
      return {
        currentPageResults: {
          ...state.currentPageResults,
          pokemons: action.payload.currentPokemons,
        },
        currentPage: {
          ...state.currentPage,
          pokemons: action.payload.currentPage,
        },
        searchResults: {
          ...state.searchResults,
          pokemons:
            action.payload.searchResults !== undefined
              ? action.payload.searchResults
              : state.searchResults.pokemons,
        },
        baseData: {
          ...state.baseData,
          pokemons: baseDataChecker(state.baseData.pokemons, action.payload.basePokemons),
        },
        sorting: {
          ...state.sorting,
          pokemons: action.payload.sorting,
        },
      };
    case PayloadTypes.sortingMove:
      return {
        currentPageResults: {
          ...state.currentPageResults,
          moves: action.payload.currentMoves,
        },
        currentPage: {
          ...state.currentPage,
          moves: action.payload.currentPage,
        },
        searchResults: {
          ...state.searchResults,
          moves:
            action.payload.searchResults !== undefined
              ? action.payload.searchResults
              : state.searchResults.moves,
        },
        baseData: {
          ...state.baseData,
          moves: baseDataChecker(state.baseData.moves, action.payload.baseMoves),
        },
        sorting: {
          ...state.sorting,
          moves: action.payload.sorting,
        },
      };
    case PayloadTypes.sortingType:
      return {
        currentPageResults: {
          ...state.currentPageResults,
          types: action.payload.currentTypes,
        },
        currentPage: {
          ...state.currentPage,
          types: action.payload.currentPage,
        },
        searchResults: {
          ...state.searchResults,
          types:
            action.payload.searchResults !== undefined
              ? action.payload.searchResults
              : state.searchResults.types,
        },
        baseData: {
          ...state.baseData,
          types: baseDataChecker(state.baseData.types, action.payload.baseTypes),
        },
        sorting: {
          ...state.sorting,
          types: action.payload.sorting,
        },
      };
    default:
      return state;
  }
};
