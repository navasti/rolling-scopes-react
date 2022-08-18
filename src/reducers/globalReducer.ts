import { GlobalAction, GlobalActionType, GlobalState, Sorting } from 'types';

export const initialState: GlobalState = {
  lengths: { moves: 0, pokemons: 0, types: 0 },
  sorting: Sorting.alphabetical,
  setPokemons: () => {},
  setSorting: () => {},
  setLengths: () => {},
  setMoves: () => {},
  setTypes: () => {},
  pokemons: [],
  moves: [],
  types: [],
};

export const globalReducer = (state: GlobalState, action: GlobalAction) => {
  const { payload, type } = action;
  switch (type) {
    case GlobalActionType.sorting:
      return {
        ...state,
        sorting: payload.sorting || state.sorting,
      };
    case GlobalActionType.pokemons:
      return {
        ...state,
        pokemons: payload.pokemons?.length ? [...payload.pokemons] : [],
      };
    case GlobalActionType.moves:
      return {
        ...state,
        moves: payload.moves || [],
      };
    case GlobalActionType.types:
      return {
        ...state,
        types: payload.types || [],
      };
    case GlobalActionType.lengths:
      return {
        ...state,
        lengths: payload.lengths || state.lengths,
      };
    default:
      return state;
  }
};
