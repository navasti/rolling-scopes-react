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

export const mapResults = async <T>(
  results: Array<{
    name: string;
    url: string;
  }>
) => {
  return await Promise.all(
    results.map(({ url }) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data as T)
    )
  );
};

export const fetchAndMapPokemons = async <T extends PokemonBaseData>(url: string) => {
  const data = (await genericFetch<T>(url)) || null;
  const mappedResults = (await mapResults(data?.results || [])) as Array<PokemonDetails>;
  return {
    base: data,
    mapped: mappedResults,
  };
};

export const fetchAndMapMoves = async <T extends MoveBaseData>(url: string) => {
  const data = (await genericFetch<T>(url)) || null;
  const mappedResults = (await mapResults(data?.results || [])) as Array<PokemonMoveDetails>;
  return {
    base: data,
    mapped: mappedResults,
  };
};

export const fetchAndMapTypes = async <T extends TypeBaseData>(url: string) => {
  const data = (await genericFetch<T>(url)) || null;
  const mappedResults = (await mapResults(data?.results || [])) as Array<PokemonTypeDetails>;
  return {
    base: data,
    mapped: mappedResults,
  };
};

export const fetchAllData = async () => {
  const allPokemons = await fetchAndMapPokemons(API.ALL_POKEMONS).then((pokemons) => pokemons);
  const allMoves = await fetchAndMapMoves(API.ALL_MOVES).then((moves) => moves);
  const allTypes = await fetchAndMapTypes(API.ALL_TYPES).then((types) => types);
  return { allPokemons: allPokemons.mapped, allMoves: allMoves.mapped, allTypes: allTypes.mapped };
};

export const getCurrentDataByParam = async (value: string) => {
  const { allMoves, allPokemons, allTypes } = await fetchAllData();
  const types = allTypes.filter((item) => item.name.includes(value));
  const moves = allMoves.filter((item) => item.name.includes(value));
  const pokemons = allPokemons.filter((item) => item.name.includes(value));
  return {
    searchResults: { pokemons, moves, types },
    currentPokemons: pokemons.slice(0, Limits.pokemon),
    currentTypes: types.slice(0, Limits.type),
    currentMoves: moves.slice(0, Limits.move),
    allPokemons,
    allTypes,
    allMoves,
  };
};

export const fetchCurrentData = async () => {
  const { allMoves, allPokemons, allTypes } = await fetchAllData();
  const movesData = await fetchAndMapMoves(`${API.MOVE}${API.MOVE_LIMIT}`).then((moves) => moves);
  const typesData = await fetchAndMapTypes(`${API.TYPE}${API.TYPE_LIMIT}`).then((types) => types);
  const pokemonsData = await fetchAndMapPokemons(`${API.POKEMON}${API.POKEMON_LIMIT}`).then(
    (pokemons) => pokemons
  );
  return {
    basePokemons: pokemonsData.base,
    baseMoves: movesData.base,
    baseTypes: typesData.base,
    currentPokemons: pokemonsData.mapped,
    currentMoves: movesData.mapped,
    currentTypes: typesData.mapped,
    allPokemons,
    allMoves,
    allTypes,
  };
};
