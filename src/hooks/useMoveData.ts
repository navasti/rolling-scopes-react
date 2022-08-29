import { useCallback, useMemo } from 'react';
import { useMoveContext } from 'contexts';
import { Limits } from 'appConstants';
import { MoveSorting } from 'types';

export const useMoveData = () => {
  const {
    moveState: { allDataResults, sorting, searchResults },
  } = useMoveContext();

  const totalPageCount = useMemo(
    () =>
      searchResults
        ? Math.ceil(searchResults.length / Limits.move)
        : Math.ceil(allDataResults.length / Limits.move),
    [allDataResults, searchResults]
  );

  const shouldFetchSearch = useMemo(
    () => sorting === MoveSorting.none && !searchResults,
    [sorting, searchResults]
  );

  const totalResults = useMemo(
    () => (searchResults ? searchResults.length : allDataResults.length),
    [searchResults, allDataResults]
  );

  const sortByAccuracy = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => b.accuracy - a.accuracy);
  }, [allDataResults, searchResults]);

  const sortAplhabetically = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => a.name.localeCompare(b.name));
  }, [allDataResults, searchResults]);

  const sortByPP = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => b.pp - a.pp);
  }, [allDataResults, searchResults]);

  const sortByPower = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id).sort((a, b) => b.power - a.power);
  }, [allDataResults, searchResults]);

  const sortById = useCallback(() => {
    const results = searchResults || allDataResults;
    return results.sort((a, b) => a.id - b.id);
  }, [allDataResults, searchResults]);

  return {
    sortById,
    sortByPP,
    sortByPower,
    totalResults,
    totalPageCount,
    sortByAccuracy,
    shouldFetchSearch,
    sortAplhabetically,
  };
};
