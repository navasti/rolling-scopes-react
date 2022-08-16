import { ErrorStatuses } from 'appConstants';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonDetails,
  PokemonData,
  PokemonMove,
  PokemonType,
  TypesData,
  MovesData,
  Pokemon,
} from 'types';

export const isServerError = (status: number) => String(status).startsWith(ErrorStatuses.server);

export const hasError = (status: number) => !String(status).startsWith(ErrorStatuses.success);

const handleCatch = (error: unknown) => {
  error instanceof Error && window.alert(error.message);
};

export const fetchByParameter = async <T>(url: string) => {
  try {
    const response = await fetch(url);
    return (await response.json()) as T;
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchBase = async <T1 extends { results: Array<T2> }, T2>(url: string) => {
  try {
    const response = await fetch(url);
    const data = (await response.json()) as T1;
    return data ? (data.results as Array<T2>) : undefined;
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchDetails = async <T1 extends { url: string }, T2>(arr: Array<T1>) => {
  try {
    const responses = await Promise.all(arr.map((item) => fetch(item.url)));
    const data = await Promise.all(responses.map((res) => res.json()));
    return data as Array<T2>;
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchPokemonBase = async (url: string) => await fetchBase<PokemonData, Pokemon>(url);
export const fetchMoveBase = async (url: string) => await fetchBase<MovesData, PokemonMove>(url);
export const fetchTypeBase = async (url: string) => await fetchBase<TypesData, PokemonType>(url);

export const fetchPokemonDetails = async (pokemons: Array<Pokemon>) =>
  await fetchDetails<Pokemon, PokemonDetails>(pokemons);
export const fetchMoveDetails = async (moves: Array<PokemonMove>) =>
  await fetchDetails<PokemonMove, PokemonMoveDetails>(moves);
export const fetchTypeDetails = async (types: Array<PokemonType>) =>
  await fetchDetails<PokemonType, PokemonTypeDetails>(types);

export const fetchPokemonByParameter = async (url: string) =>
  await fetchByParameter<PokemonDetails>(url);
export const fetchMoveByParameter = async (url: string) =>
  await fetchByParameter<PokemonMoveDetails>(url);
export const fetchTypeByParameter = async (url: string) =>
  await fetchByParameter<PokemonTypeDetails>(url);
