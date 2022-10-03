import { API, ErrorStatuses, Limits } from 'appConstants';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonBaseData,
  PokemonDetails,
  AllMappedData,
  MoveBaseData,
  TypeBaseData,
} from 'types';

export const isServerError = (status: number) => String(status).startsWith(ErrorStatuses.server);

export const hasError = (status: number) => !String(status).startsWith(ErrorStatuses.success);

export const handleCatch = (error: unknown) => {
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

export const mapResults = async <T>(
  results: Array<{
    name: string;
    url: string;
  }>
) => {
  try {
    const urls = results.map((res) => res.url);
    // In strict mode some request fail using Promise.all/allSettled. The more total requests the more fail \/
    const fetchedData = await Promise.all(urls.map((url) => fetch(url)));
    const data: Array<T> = await Promise.all(fetchedData.map((data) => data.json()));
    // When using for..of loop everything works properly but much slower and CPU fan spins faster.
    // try {
    //   for (const url of urls) {
    //     const res = await fetch(url);
    //     const fetchedData = await res.json();
    //     fetchedData && data.push(fetchedData as T);
    //   }
    // } catch (error) {
    //   handleCatch(error);
    // }
    return data;
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchAndMapPokemons = async <T extends PokemonBaseData>(url: string) => {
  try {
    const data = (await genericFetch<T>(url)) || null;
    const mappedResults = (await mapResults(data?.results || [])) as Array<PokemonDetails>;
    return {
      base: data,
      mapped: mappedResults,
    };
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchAndMapMoves = async <T extends MoveBaseData>(url: string) => {
  try {
    const data = (await genericFetch<T>(url)) || null;
    const mappedResults = (await mapResults(data?.results || [])) as Array<PokemonMoveDetails>;
    return {
      base: data,
      mapped: mappedResults,
    };
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchAndMapTypes = async <T extends TypeBaseData>(url: string) => {
  try {
    const data = (await genericFetch<T>(url)) || null;
    const mappedResults = (await mapResults(data?.results || [])) as Array<PokemonTypeDetails>;
    return {
      base: data,
      mapped: mappedResults,
    };
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchAllData = async (): Promise<Partial<AllMappedData> | undefined> => {
  try {
    const pokemons = await fetchAndMapPokemons(API.ALL_POKEMONS);
    const moves = await fetchAndMapMoves(API.ALL_MOVES);
    const types = await fetchAndMapTypes(API.ALL_TYPES);
    return { pokemons, moves, types };
  } catch (error) {
    handleCatch(error);
  }
};

export const getCurrentDataByParam = async (value: string, allData?: Partial<AllMappedData>) => {
  try {
    const types = (allData?.types?.mapped || []).filter((item) => item.name.includes(value));
    const moves = (allData?.moves?.mapped || []).filter((item) => item.name.includes(value));
    const pokemons = (allData?.pokemons?.mapped || []).filter((item) => item.name.includes(value));
    return {
      searchResults: { pokemons, moves, types },
      currentPageResults: {
        pokemons: pokemons.slice(0, Limits.pokemon),
        moves: moves.slice(0, Limits.move),
        types: types.slice(0, Limits.type),
      },
      allDataResults: {
        pokemons: allData?.pokemons?.mapped || [],
        moves: allData?.moves?.mapped || [],
        types: allData?.types?.mapped || [],
      },
    };
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchCurrentData = async (allData?: Partial<AllMappedData>) => {
  try {
    const pokemonsData = await fetchAndMapPokemons(`${API.POKEMON}${API.POKEMON_LIMIT}`);
    const movesData = await fetchAndMapMoves(`${API.MOVE}${API.MOVE_LIMIT}`);
    const typesData = await fetchAndMapTypes(`${API.TYPE}${API.TYPE_LIMIT}`);
    return {
      baseData: {
        pokemons: pokemonsData?.base || null,
        moves: movesData?.base || null,
        types: typesData?.base || null,
      },
      currentPageResults: {
        pokemons: pokemonsData?.mapped || [],
        moves: movesData?.mapped || [],
        types: typesData?.mapped || [],
      },
      allDataResults: {
        pokemons: allData?.pokemons?.mapped || [],
        types: allData?.types?.mapped || [],
        moves: allData?.moves?.mapped || [],
      },
    };
  } catch (error) {
    handleCatch(error);
  }
};
