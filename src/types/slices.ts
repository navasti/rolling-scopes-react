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

export type NextPagePayload = {
  resourceType: 'pokemons' | 'moves' | 'types';
};
export type PreviousPagePayload = {
  resourceType: 'pokemons' | 'moves' | 'types';
};
export type SpecificPagePayload = {
  resourceType: 'pokemons' | 'moves' | 'types';
  page: number;
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

export type SortingPayload = {
  sorting: PokemonSorting | MoveSorting | TypeSorting;
  resourceType: 'pokemons' | 'moves' | 'types';
};

export type ResultsAmountPayload = {
  resourceType: 'pokemons' | 'moves' | 'types';
  resultsAmount: number;
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
