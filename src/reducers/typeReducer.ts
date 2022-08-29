import { Limits } from 'appConstants';
import { TypeAction, TypeActionType, TypeContextState, TypeSorting } from 'types';

export const initialTypeState: TypeContextState = {
  resultsAmount: Limits.type,
  sorting: TypeSorting.none,
  currentPageResults: [],
  searchResults: null,
  allDataResults: [],
  currentPage: 1,
  baseData: {
    previous: null,
    results: [],
    next: null,
    count: 0,
  },
};

export const typeReducer = (state: TypeContextState, action: TypeAction) => {
  const { payload, type } = action;
  switch (type) {
    case TypeActionType.setResultsAmount:
      return {
        ...state,
        resultsAmount: payload.resultsAmount || state.resultsAmount,
      };
    case TypeActionType.setSearchResults:
      return {
        ...state,
        searchResults: payload.searchResults ? [...payload.searchResults] : null,
      };
    case TypeActionType.setCurrentPageResults:
      return {
        ...state,
        currentPageResults: [...(payload?.currentPageResults || state.currentPageResults)],
      };
    case TypeActionType.setAllDataResults:
      return {
        ...state,
        allDataResults: [...(payload?.allDataResults || state.allDataResults)],
      };
    case TypeActionType.setCurrentPage:
      return {
        ...state,
        currentPage: payload?.currentPage || state.currentPage,
      };
    case TypeActionType.setSorting:
      return {
        ...state,
        sorting: payload?.sorting || state.sorting,
      };
    case TypeActionType.setBaseData:
      return {
        ...state,
        baseData: payload?.baseData || state.baseData,
      };
    default:
      return state;
  }
};
