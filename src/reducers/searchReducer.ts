import { SearchAction, SearchActionType, SearchState, Sorting } from 'types';
import { AvailableTabs } from 'appConstants';

export const initialSearchState: SearchState = {
  lengths: { moves: 0, pokemons: 0, types: 0 },
  activeTab: AvailableTabs.pokemons,
  sorting: Sorting.order,
  isLoading: false,
  page: 1,
  pokemons: {
    currentPageResults: [],
    previous: null,
    results: [],
    next: null,
    count: 0,
  },
  moves: {
    currentPageResults: [],
    previous: null,
    results: [],
    next: null,
    count: 0,
  },
  types: {
    currentPageResults: [],
    previous: null,
    results: [],
    next: null,
    count: 0,
  },
};

export const searchReducer = (state: SearchState, action: SearchAction) => {
  const { payload, type } = action;
  switch (type) {
    case SearchActionType.isLoading:
      return {
        ...state,
        isLoading: !!payload.isLoading,
      };
    case SearchActionType.sorting:
      return {
        ...state,
        sorting: payload.sorting || state.sorting,
      };
    case SearchActionType.pokemons:
      return {
        ...state,
        pokemons: payload.pokemons ? payload.pokemons : state.pokemons,
      };
    case SearchActionType.page:
      return {
        ...state,
        page: payload.page || state.page,
      };
    case SearchActionType.moves:
      return {
        ...state,
        moves: payload.moves ? payload.moves : state.moves,
      };
    case SearchActionType.types:
      return {
        ...state,
        types: payload.types ? payload.types : state.types,
      };
    case SearchActionType.tab:
      return {
        ...state,
        activeTab: payload.activeTab || state.activeTab,
      };
    case SearchActionType.lengths:
      return {
        ...state,
        lengths: payload.lengths ? payload.lengths : state.lengths,
      };
    default:
      return state;
  }
};
