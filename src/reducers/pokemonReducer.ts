import { PokemonAction, PokemonActionType, PokemonContextState, PokemonSorting } from 'types';

export const initialPokemonState: PokemonContextState = {
  sorting: PokemonSorting.none,
  currentPageResults: [],
  allDataResults: [],
  currentPage: 1,
  baseData: {
    previous: null,
    results: [],
    next: null,
    count: 0,
  },
};

export const pokemonReducer = (state: PokemonContextState, action: PokemonAction) => {
  const { payload, type } = action;
  switch (type) {
    case PokemonActionType.setCurrentPageResults:
      return {
        ...state,
        currentPageResults: [...(payload?.currentPageResults || state.currentPageResults)],
      };
    case PokemonActionType.setAllDataResults:
      return {
        ...state,
        allDataResults: [...(payload?.allDataResults || state.allDataResults)],
      };
    case PokemonActionType.setCurrentPage:
      return {
        ...state,
        currentPage: payload?.currentPage || state.currentPage,
      };
    case PokemonActionType.setSorting:
      return {
        ...state,
        sorting: payload?.sorting || state.sorting,
      };
    case PokemonActionType.setBaseData:
      return {
        ...state,
        baseData: payload?.baseData || state.baseData,
      };
    default:
      return state;
  }
};
