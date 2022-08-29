import { usePokemonContext } from 'contexts';
import { useCallback, useMemo } from 'react';
import { PokemonSorting } from 'types';

export const usePokemonData = () => {
  const {
    pokemonState: { allDataResults, sorting, searchResults, resultsAmount },
  } = usePokemonContext();

  const totalPageCount = useMemo(
    () =>
      searchResults
        ? Math.ceil(searchResults.length / resultsAmount)
        : Math.ceil(allDataResults.length / resultsAmount),
    [allDataResults, searchResults, resultsAmount]
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
    return results
      .sort((a, b) => a.id - b.id)
      .sort((a, b) => b.base_experience - a.base_experience);
  }, [allDataResults, searchResults]);

  const sortAlphabetically = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => a.name.localeCompare(b.name));
  }, [allDataResults, searchResults]);

  const sortByHeight = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => b.height - a.height);
  }, [allDataResults, searchResults]);

  const sortByWeight = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => b.weight - a.weight);
  }, [allDataResults, searchResults]);

  const sortById = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id);
  }, [allDataResults, searchResults]);

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
