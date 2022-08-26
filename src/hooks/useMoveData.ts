import { useCallback, useMemo } from 'react';
import { useMoveContext } from 'contexts';
import { Limits } from 'appConstants';
import { MoveSorting } from 'types';

export const useMoveData = () => {
  const {
    moveState: { allDataResults, sorting },
  } = useMoveContext();

  const totalPageCount = useMemo(
    () => Math.ceil(allDataResults.length / Limits.move),
    [allDataResults]
  );

  const shouldFetchPagination = useMemo(() => sorting === MoveSorting.none, [sorting]);

  const sortByAccuracy = useCallback(
    () => allDataResults.sort((a, b) => a.id - b.id).sort((a, b) => b.accuracy - a.accuracy),
    [allDataResults]
  );

  const sortAplhabetically = useCallback(
    () => allDataResults.sort((a, b) => a.id - b.id).sort((a, b) => a.name.localeCompare(b.name)),
    [allDataResults]
  );

  const sortByPP = useCallback(
    () => allDataResults.sort((a, b) => a.id - b.id).sort((a, b) => b.pp - a.pp),
    [allDataResults]
  );

  const sortByPower = useCallback(
    () => allDataResults.sort((a, b) => a.id - b.id).sort((a, b) => b.power - a.power),
    [allDataResults]
  );

  const sortById = useCallback(() => allDataResults.sort((a, b) => a.id - b.id), [allDataResults]);

  return {
    sortById,
    sortByPP,
    sortByPower,
    totalPageCount,
    sortByAccuracy,
    sortAplhabetically,
    shouldFetchPagination,
  };
};
