import { AvailableTabs, Limits } from 'appConstants';
import {
  GlobalActionType,
  PokemonSorting,
  GlobalAction,
  GlobalState,
  MoveSorting,
  TypeSorting,
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

export const globalReducer = (state: GlobalState, action: GlobalAction) => {
  const { payload, type } = action;
  switch (type) {
    case GlobalActionType.customPokemonForm:
      return {
        ...state,
        customPokemons: payload?.customPokemons
          ? [...payload.customPokemons, ...state.customPokemons]
          : state.customPokemons,
      };
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
