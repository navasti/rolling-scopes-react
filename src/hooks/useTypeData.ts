import { Limits } from 'appConstants';
import { useTypeContext } from 'contexts';
import { useCallback, useMemo } from 'react';
import { TypeSorting } from 'types';

export const useTypeData = () => {
  const {
    typeState: { allDataResults, sorting },
  } = useTypeContext();

  const totalPageCount = useMemo(
    () => Math.ceil(allDataResults.length / Limits.type),
    [allDataResults]
  );

  const shouldFetchPagination = useMemo(() => sorting === TypeSorting.none, [sorting]);

  const sortByPokemonsAmount = useCallback(
    () =>
      allDataResults
        .sort((a, b) => a.id - b.id)
        .sort((a, b) => b.pokemon.length - a.pokemon.length),
    [allDataResults]
  );

  const sortAlphabetically = useCallback(
    () => allDataResults.sort((a, b) => a.id - b.id).sort((a, b) => a.name.localeCompare(b.name)),
    [allDataResults]
  );

  const sortByMovesAmount = useCallback(
    () =>
      allDataResults.sort((a, b) => a.id - b.id).sort((a, b) => b.moves.length - a.moves.length),
    [allDataResults]
  );

  const sortById = useCallback(() => allDataResults.sort((a, b) => a.id - b.id), [allDataResults]);

  return {
    totalPageCount,
    shouldFetchPagination,
    sortById,
    sortByMovesAmount,
    sortAlphabetically,
    sortByPokemonsAmount,
  };
};
