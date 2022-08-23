import { ErrorStatuses } from 'appConstants';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonDetails,
  CardDetails,
  BasePokemonsData,
  BaseTypesData,
  BaseMovesData,
} from 'types';

export const isServerError = (status: number) => String(status).startsWith(ErrorStatuses.server);

export const hasError = (status: number) => !String(status).startsWith(ErrorStatuses.success);

const handleCatch = (error: unknown) => {
  error instanceof Error && console.error(error.message);
};

export const genericFetch = async <T1>(url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data ? (data as T1) : undefined;
  } catch (error) {
    handleCatch(error);
  }
};

const fetchAndMapResults = async <
  T extends {
    currentPageResults?: Array<CardDetails>;
    results: Array<{
      name: string;
      url: string;
    }>;
  }
>(
  url: string
) => {
  const data = (await genericFetch<T>(url)) || null;
  if (data) {
    data.currentPageResults = await Promise.all(
      (data?.results || []).map(({ url }) =>
        fetch(url)
          .then((res) => res.json())
          .then((data) => data)
      )
    );
  }
  return data;
};

export const fetchAndMap = {
  pokemons: async (url: string) => await fetchAndMapResults<BasePokemonsData>(url),
  types: async (url: string) => await fetchAndMapResults<BaseTypesData>(url),
  moves: async (url: string) => await fetchAndMapResults<BaseMovesData>(url),
};

export const fetchByParam = {
  pokemon: async (url: string) => await genericFetch<PokemonDetails>(url),
  type: async (url: string) => await genericFetch<PokemonTypeDetails>(url),
  move: async (url: string) => await genericFetch<PokemonMoveDetails>(url),
};
