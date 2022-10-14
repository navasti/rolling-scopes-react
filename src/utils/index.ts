export * from './api';
import { DateTime } from 'luxon';
import {
  Details,
  MoveSorting,
  TypeSorting,
  MoveBaseData,
  TypeBaseData,
  PokemonDetails,
  PokemonSorting,
  PokemonBaseData,
  PokemonTypeDetails,
  PokemonMoveDetails,
} from 'types';

export const getTodayDate = (): string => {
  const { day, month, year } = DateTime.now();
  const formatDay = day < 10 ? `0${day}` : day;
  const formatMonth = month < 10 ? `0${month}` : month;
  return `${year}-${formatMonth}-${formatDay}`;
};

export const uuid = () => Date.now().toString(36) + Math.random().toString(36);

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const appendComma = (length: number, index: number, label: string) => {
  return `${label}${length === index + 1 ? '' : ', '}`;
};

type BaseDataToCheck = PokemonBaseData | TypeBaseData | MoveBaseData | null;
export const baseDataChecker = (stateData: BaseDataToCheck, payloadData?: BaseDataToCheck) =>
  payloadData !== undefined ? payloadData : stateData;

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export const prepareBaseData = <T>(details?: T | undefined) => {
  const result = details ? [details] : [];
  return {
    currentPageResults: result,
    count: result.length,
    previous: null,
    results: [],
    next: null,
  };
};

export const prepareBaseSortingData = <T>(details?: T | undefined) => {
  const result = details ? [details] : [];
  return {
    currentPageResults: result,
    count: result.length,
    results: [],
  };
};

export const sortCommon = <T extends Details[]>(array: T) => ({
  byId: () => array.sort((a, b) => a.id - b.id),
  alphabetical: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => a.name.localeCompare(b.name)),
});

export const sortPokemon = (array: Array<PokemonDetails>) => ({
  ...sortCommon(array),
  byWeight: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => Number(b.weight) - Number(a.weight)),
  byHeight: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => Number(b.height) - Number(a.height)),
  byBaseExperience: () =>
    array
      .sort((a, b) => a.id - b.id)
      .sort((a, b) => Number(b.base_experience) - Number(a.base_experience)),
});

export const sortMove = (array: Array<PokemonMoveDetails>) => ({
  ...sortCommon(array),
  byPP: () => array.sort((a, b) => a.id - b.id).sort((a, b) => Number(b.pp) - Number(a.pp)),
  byPower: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => Number(b.power) - Number(a.power)),
  byAccuracy: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => Number(b.accuracy) - Number(a.accuracy)),
});

export const sortType = (array: Array<PokemonTypeDetails>) => ({
  ...sortCommon(array),
  byMovesAmount: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => b.moves.length - a.moves.length),
  byPokemonsAmount: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => b.pokemon.length - a.pokemon.length),
});

export const isPokemon = (resourceType: string) => resourceType === 'pokemons';
export const isMove = (resourceType: string) => resourceType === 'moves';
export const isType = (resourceType: string) => resourceType === 'types';

export const moveSortObject = (moves: Array<PokemonMoveDetails>) => ({
  [MoveSorting.alphabetical]: sortMove(moves).alphabetical,
  [MoveSorting.accuracy]: sortMove(moves).byAccuracy,
  [MoveSorting.power]: sortMove(moves).byPower,
  [MoveSorting.none]: sortMove(moves).byId,
  [MoveSorting.pp]: sortMove(moves).byPP,
});

export const typeSortObject = (types: Array<PokemonTypeDetails>) => ({
  [TypeSorting.pokemonsAmount]: sortType(types).byPokemonsAmount,
  [TypeSorting.alphabetical]: sortType(types).alphabetical,
  [TypeSorting.movesAmount]: sortType(types).byMovesAmount,
  [TypeSorting.none]: sortType(types).byId,
});

export const pokemonSortObject = (pokemons: Array<PokemonDetails>) => ({
  [PokemonSorting.baseExperience]: sortPokemon(pokemons).byBaseExperience,
  [PokemonSorting.alphabetical]: sortPokemon(pokemons).alphabetical,
  [PokemonSorting.weight]: sortPokemon(pokemons).byWeight,
  [PokemonSorting.height]: sortPokemon(pokemons).byHeight,
  [PokemonSorting.none]: sortPokemon(pokemons).byId,
});
