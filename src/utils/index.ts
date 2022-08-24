import { DateTime } from 'luxon';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonsSorting,
  PokemonDetails,
  MovesSorting,
  TypesSorting,
} from 'types';
export * from './api';

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

export const handlePokemonSorting = (sort: string, pokemons: Array<PokemonDetails>) => {
  return pokemons.sort((a, b) => {
    if (sort === PokemonsSorting.baseExperience) return b.base_experience - a.base_experience;
    if (sort === PokemonsSorting.alphabetical) return a.name.localeCompare(b.name);
    if (sort === PokemonsSorting.height) return b.height - a.height;
    if (sort === PokemonsSorting.weight) return b.weight - a.weight;
    return 0;
  });
};

export const handleMovesSorting = (sort: string, moves: Array<PokemonMoveDetails>) => {
  return moves.sort((a, b) => {
    if (sort === MovesSorting.alphabetical) return a.name.localeCompare(b.name);
    if (sort === MovesSorting.accuracy) return b.accuracy - a.accuracy;
    if (sort === MovesSorting.power) return b.power - a.power;
    if (sort === MovesSorting.pp) return b.pp - a.pp;
    return 0;
  });
};

export const handleTypesSorting = (sort: string, types: Array<PokemonTypeDetails>) => {
  return types.sort((a, b) => {
    if (sort === TypesSorting.pokemonsAmount) return b.pokemon.length - a.pokemon.length;
    if (sort === TypesSorting.movesAmount) return b.moves.length - a.moves.length;
    if (sort === TypesSorting.alphabetical) return a.name.localeCompare(b.name);
    return 0;
  });
};
