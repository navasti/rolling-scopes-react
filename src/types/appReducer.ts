import { AvailableTabs } from 'appConstants';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  CurrentPageResults,
  PokemonBaseData,
  PokemonDetails,
  PokemonSorting,
  AllDataResults,
  ResultsAmount,
  CustomPokemon,
  SearchResults,
  MoveBaseData,
  TypeBaseData,
  TypeSorting,
  MoveSorting,
  CurrentPage,
  BaseData,
  Sorting,
} from './index';

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type GlobalState = {
  customPokemons: Array<CustomPokemon & { id: string }>;
  currentPageResults: CurrentPageResults;
  allDataResults: AllDataResults;
  searchResults: SearchResults;
  resultsAmount: ResultsAmount;
  currentPage: CurrentPage;
  activeTab: AvailableTabs;
  baseData: BaseData;
  isLoading: boolean;
  sorting: Sorting;
};

export enum PayloadTypes {
  pokemonsPagination = 'pokemonsPagination',
  typesPagination = 'typesPagination',
  movesPagination = 'movesPagination',
  formPokemons = 'formPokemons',
  currentParamData = 'currentParamData',
  currentData = 'currentData',
  activeTab = 'activeTab',
  pokemonResults = 'pokemonResults',
  typeResults = 'typeResults',
  moveResults = 'moveResults',
  sortingPokemon = 'sortingPokemon',
  sortingMove = 'sortingMove',
  sortingType = 'sortingType',
  searchData = 'searchData',
  loading = 'loading',
}

export type LoadingPayload = {
  [PayloadTypes.loading]: boolean;
};

export type FormPayload = {
  [PayloadTypes.formPokemons]: CustomPokemon & { id: string };
};

export type ActiveTabPayload = {
  [PayloadTypes.activeTab]: AvailableTabs;
};

export type DataPayload = {
  [PayloadTypes.sortingPokemon]: {
    currentPokemons: Array<PokemonDetails>;
    basePokemons?: PokemonBaseData | null;
    searchResults?: Array<PokemonDetails>;
    sorting: PokemonSorting;
    currentPage: number;
  };
  [PayloadTypes.sortingMove]: {
    currentMoves: Array<PokemonMoveDetails>;
    searchResults?: Array<PokemonMoveDetails>;
    baseMoves?: MoveBaseData | null;
    sorting: MoveSorting;
    currentPage: number;
  };
  [PayloadTypes.sortingType]: {
    currentTypes: Array<PokemonTypeDetails>;
    searchResults?: Array<PokemonTypeDetails>;
    baseTypes?: TypeBaseData | null;
    sorting: TypeSorting;
    currentPage: number;
  };
  [PayloadTypes.searchData]: {
    currentPageResults: CurrentPageResults;
    searchResults: SearchResults;
    currentPage: CurrentPage;
    sorting: Sorting;
  };
  [PayloadTypes.pokemonResults]: {
    currentPokemons: Array<PokemonDetails>;
    basePokemons?: PokemonBaseData | null;
    resultsAmount: number;
    currentPage: number;
  };
  [PayloadTypes.moveResults]: {
    currentMoves: Array<PokemonMoveDetails>;
    baseMoves?: MoveBaseData | null;
    resultsAmount: number;
    currentPage: number;
  };
  [PayloadTypes.typeResults]: {
    currentTypes: Array<PokemonTypeDetails>;
    baseTypes?: TypeBaseData | null;
    resultsAmount: number;
    currentPage: number;
  };
  [PayloadTypes.pokemonsPagination]: {
    currentPokemons: Array<PokemonDetails>;
    basePokemons?: PokemonBaseData | null;
    currentPage: number;
  };
  [PayloadTypes.typesPagination]: {
    currentTypes: Array<PokemonTypeDetails>;
    baseTypes?: TypeBaseData | null;
    currentPage: number;
  };
  [PayloadTypes.movesPagination]: {
    currentMoves: Array<PokemonMoveDetails>;
    baseMoves?: MoveBaseData | null;
    currentPage: number;
  };
  [PayloadTypes.currentData]: {
    currentPageResults: CurrentPageResults;
    allDataResults: AllDataResults;
    baseData: BaseData;
  };
  [PayloadTypes.currentParamData]: {
    currentPageResults: CurrentPageResults;
    allDataResults: AllDataResults;
    searchResults: SearchResults;
  };
};

export type DataActions = ActionMap<DataPayload>[keyof ActionMap<DataPayload>];
export type FormActions = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];
export type LoadingActions = ActionMap<LoadingPayload>[keyof ActionMap<LoadingPayload>];
export type ActiveTabActions = ActionMap<ActiveTabPayload>[keyof ActionMap<ActiveTabPayload>];

export type Actions = FormActions | ActiveTabActions | DataActions | LoadingActions;
