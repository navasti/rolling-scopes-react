import { usePokemonContext } from 'contexts';
import { useCallback, useMemo } from 'react';
import { PokemonSorting } from 'types';
import { Limits } from 'appConstants';

export const usePokemonData = () => {
  const {
    pokemonState: { allDataResults, sorting, searchResults },
  } = usePokemonContext();

  const totalPageCount = useMemo(
    () =>
      searchResults
        ? Math.ceil(searchResults.length / Limits.pokemon)
        : Math.ceil(allDataResults.length / Limits.pokemon),
    [allDataResults, searchResults]
  );

  const totalResults = useMemo(
    () => (searchResults ? searchResults.length : allDataResults.length),
    [searchResults, allDataResults]
  );

  const shouldFetchSearch = useMemo(
    () => sorting === PokemonSorting.none && !searchResults,
    [sorting, searchResults]
  );

  const sortByBaseExperience = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => b.base_experience - a.base_experience);
  }, [allDataResults, searchResults]);

  const sortAlphabetically = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.name.localeCompare(b.name));
  }, [allDataResults, searchResults]);

  const sortByHeight = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => b.height - a.height);
  }, [allDataResults, searchResults]);

  const sortByWeight = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => b.weight - a.weight);
  }, [allDataResults, searchResults]);

  const sortById = useCallback(() => allDataResults.sort((a, b) => a.id - b.id), [allDataResults]);

  return {
    sortById,
    sortByWeight,
    sortByHeight,
    totalPageCount,
    totalResults,
    sortAlphabetically,
    sortByBaseExperience,
    shouldFetchSearch,
  };
};
