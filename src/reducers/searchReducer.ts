import { AvailableTabs } from 'appConstants';
import { prepareBaseData } from 'utils';
import {
  SearchActionType,
  PokemonsSorting,
  SearchAction,
  MovesSorting,
  SearchState,
  TypesSorting,
} from 'types';

export const initialSearchState: SearchState = {
  lengths: { moves: 0, pokemons: 0, types: 0 },
  pokemonsSorting: PokemonsSorting.none,
  activeTab: AvailableTabs.pokemons,
  movesSorting: MovesSorting.none,
  typesSorting: TypesSorting.none,
  pokemons: prepareBaseData(),
  moves: prepareBaseData(),
  types: prepareBaseData(),
  sortingData: null,
  isLoading: false,
  page: 1,
};

export const searchReducer = (state: SearchState, action: SearchAction) => {
  const { payload, type } = action;
  switch (type) {
    case SearchActionType.isLoading:
      return {
        ...state,
        isLoading: !!payload.isLoading,
      };
    case SearchActionType.pokemonsSorting:
      return {
        ...state,
        pokemonsSorting: payload.pokemonsSorting || state.pokemonsSorting,
      };
    case SearchActionType.movesSorting:
      return {
        ...state,
        movesSorting: payload.movesSorting || state.movesSorting,
      };
    case SearchActionType.typesSorting:
      return {
        ...state,
        typesSorting: payload.typesSorting || state.typesSorting,
      };
    case SearchActionType.sortingData:
      return {
        ...state,
        sortingData: payload.sortingData || state.sortingData,
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
