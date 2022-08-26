import { SearchActionType, SearchAction, SearchState } from 'types';
import { AvailableTabs } from 'appConstants';

export const initialSearchState: SearchState = {
  lengths: { moves: 0, pokemons: 0, types: 0 },
  activeTab: AvailableTabs.pokemons,
  searchingResults: null,
  isLoading: false,
};

export const searchReducer = (state: SearchState, action: SearchAction) => {
  const { payload, type } = action;
  switch (type) {
    case SearchActionType.isLoading:
      return {
        ...state,
        isLoading: !!payload.isLoading,
      };
    case SearchActionType.searchingResults:
      return {
        ...state,
        searchingResults: payload.searchingResults || state.searchingResults,
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
