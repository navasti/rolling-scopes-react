import { Limits } from 'appConstants';
import { usePokemonContext } from 'contexts';
import { useCallback, useMemo } from 'react';
import { PokemonSorting } from 'types';

export const usePokemonData = () => {
  const {
    pokemonState: { allDataResults, sorting },
  } = usePokemonContext();

  const totalPageCount = useMemo(
    () => Math.ceil(allDataResults.length / Limits.pokemon),
    [allDataResults]
  );

  const shouldFetchPagination = useMemo(() => sorting === PokemonSorting.none, [sorting]);

  const sortByBaseExperience = useCallback(
    () => allDataResults.sort((a, b) => b.base_experience - a.base_experience),
    [allDataResults]
  );

  const sortAlphabetically = useCallback(
    () => allDataResults.sort((a, b) => a.name.localeCompare(b.name)),
    [allDataResults]
  );

  const sortByHeight = useCallback(
    () => allDataResults.sort((a, b) => b.height - a.height),
    [allDataResults]
  );

  const sortByWeight = useCallback(
    () => allDataResults.sort((a, b) => b.weight - a.weight),
    [allDataResults]
  );

  const sortById = useCallback(() => allDataResults.sort((a, b) => a.id - b.id), [allDataResults]);

  return {
    sortById,
    sortByWeight,
    sortByHeight,
    totalPageCount,
    sortAlphabetically,
    sortByBaseExperience,
    shouldFetchPagination,
  };
};
