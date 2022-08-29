import { MoveActionType, MoveContextState, MoveSorting } from 'types';

type MoveAction = {
  type: MoveActionType;
  payload: Partial<MoveContextState>;
};

export const initialMoveState: MoveContextState = {
  sorting: MoveSorting.none,
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

export const moveReducer = (state: MoveContextState, action: MoveAction) => {
  const { payload, type } = action;
  switch (type) {
    case MoveActionType.setSearchResults:
      return {
        ...state,
        searchResults: payload.searchResults ? [...payload.searchResults] : null,
      };
    case MoveActionType.setCurrentPageResults:
      return {
        ...state,
        currentPageResults: [...(payload?.currentPageResults || state.currentPageResults)],
      };
    case MoveActionType.setAllDataResults:
      return {
        ...state,
        allDataResults: [...(payload?.allDataResults || state.allDataResults)],
      };
    case MoveActionType.setCurrentPage:
      return {
        ...state,
        currentPage: payload?.currentPage || state.currentPage,
      };
    case MoveActionType.setSorting:
      return {
        ...state,
        sorting: payload?.sorting || state.sorting,
      };
    case MoveActionType.setBaseData:
      return {
        ...state,
        baseData: payload?.baseData || state.baseData,
      };
    default:
      return state;
  }
};
