import { MoveSorting, PokemonSorting, TypeSorting } from 'types';
import { useAppContext } from 'contexts';

export const useGlobalData = () => {
  const {
    state: { allDataResults, resultsAmount, searchResults, sorting },
  } = useAppContext();

  const totalPageCounts = {
    moves: Math.ceil(
      (searchResults.moves?.length || allDataResults.moves.length) / resultsAmount.moves
    ),
    types: Math.ceil(
      (searchResults.types?.length || allDataResults.types.length) / resultsAmount.types
    ),
    pokemons: Math.ceil(
      (searchResults.pokemons?.length || allDataResults.pokemons.length) / resultsAmount.pokemons
    ),
  };

  const totalResults = {
    moves: searchResults.moves ? searchResults.moves.length : allDataResults.moves.length,
    types: searchResults.types ? searchResults.types.length : allDataResults.types.length,
    pokemons: searchResults.pokemons
      ? searchResults.pokemons.length
      : allDataResults.pokemons.length,
  };

  const shouldFetchSearch = {
    moves: sorting.moves === MoveSorting.none && !searchResults.moves?.length,
    types: sorting.types === TypeSorting.none && !searchResults.types?.length,
    pokemons: sorting.pokemons === PokemonSorting.none && !searchResults.pokemons?.length,
  };

  return { totalPageCounts, shouldFetchSearch, totalResults };
};
