import { SearchAction, SearchActionType, SearchState, Sorting } from 'types';

export const initialSearchState: SearchState = {
  lengths: { moves: 0, pokemons: 0, types: 0 },
  sorting: Sorting.alphabetical,
  isLoading: false,
  pokemons: [],
  moves: [],
  types: [],
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
        pokemons: payload.pokemons?.length ? payload.pokemons : [],
      };
    case SearchActionType.moves:
      return {
        ...state,
        moves: payload.moves?.length ? payload.moves : [],
      };
    case SearchActionType.types:
      return {
        ...state,
        types: payload.types?.length ? payload.types : [],
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
