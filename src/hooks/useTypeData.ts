import { useCallback, useMemo } from 'react';
import { useTypeContext } from 'contexts';
import { TypeSorting } from 'types';

export const useTypeData = () => {
  const {
    typeState: { allDataResults, sorting, searchResults, resultsAmount },
  } = useTypeContext();

  const totalPageCount = useMemo(
    () =>
      searchResults
        ? Math.ceil(searchResults.length / resultsAmount)
        : Math.ceil(allDataResults.length / resultsAmount),
    [allDataResults, searchResults, resultsAmount]
  );

  const shouldFetchSearch = useMemo(
    () => sorting === TypeSorting.none && !searchResults,
    [sorting, searchResults]
  );

  const totalResults = useMemo(
    () => (searchResults ? searchResults.length : allDataResults.length),
    [searchResults, allDataResults]
  );

  const sortByPokemonsAmount = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => b.pokemon.length - a.pokemon.length);
  }, [allDataResults, searchResults]);

  const sortAlphabetically = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => a.name.localeCompare(b.name));
  }, [allDataResults, searchResults]);

  const sortByMovesAmount = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => b.moves.length - a.moves.length);
  }, [allDataResults, searchResults]);

  const sortById = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id);
  }, [allDataResults, searchResults]);

  return {
    totalResults,
    totalPageCount,
    shouldFetchSearch,
    sortById,
    sortByMovesAmount,
    sortAlphabetically,
    sortByPokemonsAmount,
  };
};
