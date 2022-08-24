import { BaseSortingData, PokemonsSorting, MovesSorting, TypesSorting } from 'types';
import { API, AvailableTabs, Limits } from 'appConstants';
import { useSearchContext } from 'contexts';
import { ChangeEvent } from 'react';
import * as S from './styled';
import {
  fetchAndMapSortingData,
  handlePokemonSorting,
  handleMovesSorting,
  handleTypesSorting,
} from 'utils';

export const SortingSelector = () => {
  const {
    setPage,
    setIsLoading,
    setSortingData,
    setMovesSorting,
    setTypesSorting,
    setPokemonsSorting,
    searchState: { movesSorting, pokemonsSorting, typesSorting, activeTab, sortingData },
  } = useSearchContext();

  const handleSorting = async (sort: string) => {
    let data: BaseSortingData | null = null;

    if (!sortingData) {
      const pokemons = await fetchAndMapSortingData.pokemons(API.ALL_POKEMONS);
      const moves = await fetchAndMapSortingData.moves(API.ALL_MOVES);
      const types = await fetchAndMapSortingData.types(API.ALL_TYPES);
      if (pokemons && moves && types) {
        data = { moves, types, pokemons };
      }
    } else data = JSON.parse(JSON.stringify(sortingData));

    if (data) {
      const sortedPokemons = handlePokemonSorting(sort, data.pokemons.results || []);
      data.pokemons.results = sortedPokemons;
      data.pokemons.currentPageResults = sortedPokemons.slice(0, Limits.pokemon);

      const sortedMoves = handleMovesSorting(sort, data.moves.results || []);
      data.moves.results = sortedMoves;
      data.moves.currentPageResults = sortedMoves.slice(0, Limits.move);

      const sortedTypes = handleTypesSorting(sort, data.types.results || []);
      data.types.results = sortedTypes;
      data.types.currentPageResults = sortedTypes.slice(0, Limits.type);

      setSortingData(data);
    }

    setPage(1);
  };

  const handlePokemonsSortingChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const value = event.target.value as PokemonsSorting;
    setPokemonsSorting(value);
    await handleSorting(value);
    setIsLoading(false);
  };

  const handleTypesSortingChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const value = event.target.value as TypesSorting;
    setTypesSorting(value);
    await handleSorting(value);
    setIsLoading(false);
  };

  const handleMovesSortingChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const value = event.target.value as MovesSorting;
    setMovesSorting(value);
    await handleSorting(value);
    setIsLoading(false);
  };

  return (
    <S.SelectorWrapper>
      {activeTab === AvailableTabs.pokemons && (
        <>
          <S.SelectorWrapper>
            <S.Label htmlFor="sorting-pokemons">Sort pokemons</S.Label>
            <S.Select value={pokemonsSorting} onChange={handlePokemonsSortingChange}>
              <option value={PokemonsSorting.none}>{PokemonsSorting.none}</option>
              <option value={PokemonsSorting.alphabetical}>{PokemonsSorting.alphabetical}</option>
              <option value={PokemonsSorting.height}>{PokemonsSorting.height}</option>
              <option value={PokemonsSorting.weight}>{PokemonsSorting.weight}</option>
              <option value={PokemonsSorting.baseExperience}>
                {PokemonsSorting.baseExperience}
              </option>
            </S.Select>
          </S.SelectorWrapper>
        </>
      )}
      {activeTab === AvailableTabs.moves && (
        <>
          <S.Label htmlFor="sorting-moves">Sort moves</S.Label>
          <S.Select value={movesSorting} onChange={handleMovesSortingChange}>
            <option value={MovesSorting.none}>{MovesSorting.none}</option>
            <option value={MovesSorting.accuracy}>{MovesSorting.accuracy}</option>
            <option value={MovesSorting.alphabetical}>{MovesSorting.alphabetical}</option>
            <option value={MovesSorting.power}>{MovesSorting.power}</option>
            <option value={MovesSorting.pp}>{MovesSorting.pp}</option>
          </S.Select>
        </>
      )}
      {activeTab === AvailableTabs.types && (
        <>
          <S.Label htmlFor="sorting-types">Sort types</S.Label>
          <S.Select value={typesSorting} onChange={handleTypesSortingChange}>
            <option value={TypesSorting.none}>{TypesSorting.none}</option>
            <option value={TypesSorting.movesAmount}>{TypesSorting.movesAmount}</option>
            <option value={TypesSorting.alphabetical}>{TypesSorting.alphabetical}</option>
            <option value={TypesSorting.pokemonsAmount}>{TypesSorting.pokemonsAmount}</option>
          </S.Select>
        </>
      )}
    </S.SelectorWrapper>
  );
};
