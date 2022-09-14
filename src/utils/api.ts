import { API, ErrorStatuses, Limits } from 'appConstants';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonDetails,
  PokemonBaseData,
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
  const data: Array<T> = [];
  const urls = results.map((res) => res.url);
  for (const url of urls) {
    try {
      const fetchedData = await fetch(url).then((data) =>
        data.json().then((data) => (data ? (data as T) : null))
      );
      fetchedData && data.push(fetchedData);
    } catch (error) {
      handleCatch(error);
    }
  }
  return data;
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

export const fetchAllData = async () => {
  try {
    const allPokemons = await fetchAndMapPokemons(API.ALL_POKEMONS).then((pokemons) => pokemons);
    const allMoves = await fetchAndMapMoves(API.ALL_MOVES).then((moves) => moves);
    const allTypes = await fetchAndMapTypes(API.ALL_TYPES).then((types) => types);
    return {
      allPokemons: allPokemons?.mapped,
      allMoves: allMoves?.mapped,
      allTypes: allTypes?.mapped,
    };
  } catch (error) {
    handleCatch(error);
  }
};

export const getCurrentDataByParam = async (value: string) => {
  try {
    const data = await fetchAllData();
    const types = (data?.allTypes || []).filter((item) => item.name.includes(value));
    const moves = (data?.allMoves || []).filter((item) => item.name.includes(value));
    const pokemons = (data?.allPokemons || []).filter((item) => item.name.includes(value));
    return {
      searchResults: { pokemons, moves, types },
      currentPokemons: pokemons.slice(0, Limits.pokemon),
      currentTypes: types.slice(0, Limits.type),
      currentMoves: moves.slice(0, Limits.move),
      allPokemons: data?.allPokemons,
      allTypes: data?.allTypes,
      allMoves: data?.allMoves,
    };
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchCurrentData = async () => {
  try {
    const data = await fetchAllData();
    const movesData = await fetchAndMapMoves(`${API.MOVE}${API.MOVE_LIMIT}`).then((moves) => moves);
    const typesData = await fetchAndMapTypes(`${API.TYPE}${API.TYPE_LIMIT}`).then((types) => types);
    const pokemonsData = await fetchAndMapPokemons(`${API.POKEMON}${API.POKEMON_LIMIT}`).then(
      (pokemons) => pokemons
    );
    return {
      basePokemons: pokemonsData?.base,
      baseMoves: movesData?.base,
      baseTypes: typesData?.base,
      currentPokemons: pokemonsData?.mapped,
      currentMoves: movesData?.mapped,
      currentTypes: typesData?.mapped,
      allPokemons: data?.allPokemons,
      allMoves: data?.allMoves,
      allTypes: data?.allTypes,
    };
  } catch (error) {
    handleCatch(error);
  }
};
