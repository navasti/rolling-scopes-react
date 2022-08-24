import { ErrorStatuses } from 'appConstants';
import {
  BaseSearchPokemonsData,
  BaseSearchTypesData,
  BaseSearchMovesData,
  PokemonMoveDetails,
  PokemonTypeDetails,
  BasePokemonsData,
  PokemonDetails,
  BaseTypesData,
  BaseMovesData,
  CardDetails,
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

export const mapResults = async (
  results: Array<{
    name: string;
    url: string;
  }>
) => {
  return await Promise.all(
    results.map(({ url }) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data)
    )
  );
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
  if (data) data.currentPageResults = await mapResults(data?.results || []);
  return data;
};

export const fetchAndMapSortingData = {
  pokemons: async (url: string) => {
    const data = await genericFetch<BasePokemonsData>(url);
    const mapped: PokemonDetails[] = await mapResults(data?.results || []);
    if (data) {
      const sortingData: BaseSearchPokemonsData = structuredClone(data);
      sortingData.results = mapped;
      return sortingData;
    }
  },
  types: async (url: string) => {
    const data = await genericFetch<BaseTypesData>(url);
    const mapped: PokemonTypeDetails[] = await mapResults(data?.results || []);
    if (data) {
      const sortingData: BaseSearchTypesData = structuredClone(data);
      sortingData.results = mapped;
      return sortingData;
    }
  },
  moves: async (url: string) => {
    const data = await genericFetch<BaseMovesData>(url);
    const mapped: PokemonMoveDetails[] = await mapResults(data?.results || []);
    if (data) {
      const sortingData: BaseSearchMovesData = structuredClone(data);
      sortingData.results = mapped;
      return sortingData;
    }
  },
};

export const fetchBase = {
  pokemons: async (url: string) => await genericFetch<BasePokemonsData>(url),
  types: async (url: string) => await genericFetch<BaseTypesData>(url),
  moves: async (url: string) => await genericFetch<BaseMovesData>(url),
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
