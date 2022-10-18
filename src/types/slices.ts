import { AvailableTabs, Limits } from 'appConstants';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonBaseData,
  PokemonDetails,
  PokemonSorting,
  TypeBaseData,
  MoveBaseData,
  MoveSorting,
  TypeSorting,
  CustomPokemon,
} from 'types';

export type ResourcesState = {
  searchTypeResults: Array<PokemonTypeDetails> | null;
  searchMoveResults: Array<PokemonMoveDetails> | null;
  searchPokemonResults: Array<PokemonDetails> | null;
  currentMoves: Array<PokemonMoveDetails>;
  currentTypes: Array<PokemonTypeDetails>;
  currentPokemons: Array<PokemonDetails>;
  status: Status;
  basePokemons: PokemonBaseData | null;
  pokemonResultsAmount: Limits.pokemon;
  moveResultsAmount: Limits.move;
  typeResultsAmount: Limits.type;
  allPokemons: Array<PokemonDetails>;
  allMoves: Array<PokemonMoveDetails>;
  allTypes: Array<PokemonTypeDetails>;
  baseMoves: MoveBaseData | null;
  baseTypes: TypeBaseData | null;
  pokemonSorting: PokemonSorting;
  currentPokemonPage: number;
  currentMovePage: number;
  currentTypePage: number;
  moveSorting: MoveSorting;
  typeSorting: TypeSorting;
};

export enum Status {
  loading = 'loading',
  failed = 'failed',
  idle = 'idle',
}

export type SortingThunkParams = {
  resourceType: 'pokemons' | 'moves' | 'types';
  resultsAmount: number;
};

export type ResultsAmountParams = {
  resourceType: 'pokemons' | 'moves' | 'types';
  resultsAmount: number;
};

export type NextPageParams = {
  resourceType: 'pokemons' | 'moves' | 'types';
  next: string;
};

export type PreviousPageParams = {
  resourceType: 'pokemons' | 'moves' | 'types';
  previous: string;
};

export type SpecificPageParams = {
  resourceType: 'pokemons' | 'moves' | 'types';
  resultsAmount: number;
  page: number;
};

export type SearchResultsParams = {
  pokemonResultsAmount: number;
  typeResultsAmount: number;
  moveResultsAmount: number;
};

export type SearchResultsPayload = {
  inputValue: string;
};

export type TabsState = {
  activeTab: AvailableTabs;
};

export type FormState = {
  customPokemons: Array<CustomPokemon & { id: string }>;
};

export type PokemonSortingPayload = {
  pokemons: Array<PokemonDetails>;
  sorting: PokemonSorting;
};

export type MoveSortingPayload = {
  moves: Array<PokemonMoveDetails>;
  sorting: MoveSorting;
};

export type TypeSortingPayload = {
  types: Array<PokemonTypeDetails>;
  sorting: TypeSorting;
};

export type PokemonResultsPayload = {
  pokemons: Array<PokemonDetails>;
  resultsAmount: number;
};

export type MoveResultsPayload = {
  moves: Array<PokemonMoveDetails>;
  resultsAmount: number;
};

export type TypeResultsPayload = {
  types: Array<PokemonTypeDetails>;
  resultsAmount: number;
};

export type PokemonSpeficicPagePayload = {
  pokemons: Array<PokemonDetails>;
  page: number;
};
export type MoveSpeficicPagePayload = {
  moves: Array<PokemonMoveDetails>;
  page: number;
};
export type TypeSpeficicPagePayload = {
  types: Array<PokemonTypeDetails>;
  page: number;
};
