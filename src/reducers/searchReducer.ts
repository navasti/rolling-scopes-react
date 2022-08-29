import { SearchActionType, SearchAction, SearchState } from 'types';
import { AvailableTabs } from 'appConstants';

export const initialSearchState: SearchState = {
  activeTab: AvailableTabs.pokemons,
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
    case SearchActionType.tab:
      return {
        ...state,
        activeTab: payload.activeTab || state.activeTab,
      };
    default:
      return state;
  }
};
