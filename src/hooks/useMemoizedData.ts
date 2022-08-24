import { MovesSorting, PokemonsSorting, TypesSorting } from 'types';
import { useSearchContext } from 'contexts';
import { useMemo } from 'react';

export const useMemoizedData = (id?: number) => {
  const {
    searchState: {
      moves,
      types,
      pokemons,
      sortingData,
      typesSorting,
      movesSorting,
      pokemonsSorting,
    },
  } = useSearchContext();
  const pokemonData = useMemo(() => {
    return sortingData && pokemonsSorting !== PokemonsSorting.none
      ? sortingData.pokemons
      : pokemons;
  }, [pokemons, sortingData, pokemonsSorting]);

  const movesData = useMemo(() => {
    return sortingData && movesSorting !== MovesSorting.none ? sortingData.moves : moves;
  }, [moves, sortingData, movesSorting]);

  const typesData = useMemo(() => {
    return sortingData && typesSorting !== TypesSorting.none ? sortingData.types : types;
  }, [types, sortingData, typesSorting]);

  const pokemonMatchingId = useMemo(() => {
    return pokemonData.currentPageResults?.find((pokemon) => pokemon.id === Number(id));
  }, [pokemonData, id]);

  const moveMatchingId = useMemo(() => {
    return movesData.currentPageResults?.find((move) => move.id === Number(id));
  }, [movesData, id]);

  const typeMatchingId = useMemo(() => {
    return typesData.currentPageResults?.find((type) => type.id === Number(id));
  }, [typesData, id]);

  const isDataFound = useMemo(() => {
    return !!typeMatchingId || !!moveMatchingId || !!pokemonMatchingId;
  }, [typeMatchingId, moveMatchingId, pokemonMatchingId]);

  const isSorting = useMemo(() => {
    return (
      movesSorting !== MovesSorting.none ||
      typesSorting !== TypesSorting.none ||
      pokemonsSorting !== PokemonsSorting.none
    );
  }, [movesSorting, typesSorting, pokemonsSorting]);
  return {
    pokemonMatchingId,
    moveMatchingId,
    typeMatchingId,
    isDataFound,
    isSorting,
    pokemonData,
    movesData,
    typesData,
  };
};
