import { Details, PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { DateTime } from 'luxon';
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

export const sortCommon = <T extends Details[]>(array: T) => ({
  byId: () => array.sort((a, b) => a.id - b.id),
  alphabetical: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => a.name.localeCompare(b.name)),
});

export const sortPokemon = (array: Array<PokemonDetails>) => ({
  ...sortCommon(array),
  byWeight: () => array.sort((a, b) => a.id - b.id).sort((a, b) => b.weight - a.weight),
  byHeight: () => array.sort((a, b) => a.id - b.id).sort((a, b) => b.height - a.height),
  byBaseExperience: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => b.base_experience - a.base_experience),
});

export const sortMove = (array: Array<PokemonMoveDetails>) => ({
  ...sortCommon(array),
  byPP: () => array.sort((a, b) => a.id - b.id).sort((a, b) => b.pp - a.pp),
  byPower: () => array.sort((a, b) => a.id - b.id).sort((a, b) => b.power - a.power),
  byAccuracy: () => array.sort((a, b) => a.id - b.id).sort((a, b) => b.accuracy - a.accuracy),
});

export const sortType = (array: Array<PokemonTypeDetails>) => ({
  ...sortCommon(array),
  byMovesAmount: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => b.moves.length - a.moves.length),
  byPokemonsAmount: () =>
    array.sort((a, b) => a.id - b.id).sort((a, b) => b.pokemon.length - a.pokemon.length),
});
