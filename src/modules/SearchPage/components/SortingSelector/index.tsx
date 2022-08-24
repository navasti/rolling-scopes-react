import { handleMovesSorting, handlePokemonSorting, handleTypesSorting, fetchAndMap } from 'utils';
import { ChangeEvent, useEffect, useRef } from 'react';
import { API, AvailableTabs } from 'appConstants';
import { useSearchContext } from 'contexts';
import * as S from './styled';
import {
  BasePokemonsData,
  BaseSortingData,
  PokemonsSorting,
  BaseMovesData,
  BaseTypesData,
  MovesSorting,
  TypesSorting,
} from 'types';

export const SortingSelector = () => {
  const select = useRef<HTMLSelectElement>(null);

  const {
    setIsLoading,
    setSortingData,
    setMovesSorting,
    setTypesSorting,
    setPokemonsSorting,
    searchState: { movesSorting, pokemonsSorting, typesSorting, activeTab, sortingData },
  } = useSearchContext();

  useEffect(() => {
    console.log(sortingData);
  }, [sortingData]);

  const fetchBaseSortingData = async () => {
    const pokemons = await fetchAndMap.pokemons(API.ALL_POKEMONS);
    const moves = await fetchAndMap.moves(API.ALL_MOVES);
    const types = await fetchAndMap.types(API.ALL_TYPES);
    return {
      pokemons,
      moves,
      types,
    };
  };

  const handleSorting = (
    sort: string,
    fetchedData?: {
      moves: BaseMovesData;
      types: BaseTypesData;
      pokemons: BasePokemonsData;
    }
  ) => {
    let data: BaseSortingData;
    if (!fetchedData) data = JSON.parse(JSON.stringify(sortingData)) as BaseSortingData;
    else data = fetchedData;

    const sortedPokemons = handlePokemonSorting(sort, data.pokemons.currentPageResults || []);
    data.pokemons.currentPageResults = sortedPokemons;

    const sortedMoves = handleMovesSorting(sort, data.moves.currentPageResults || []);
    data.moves.currentPageResults = sortedMoves;

    const sortedTypes = handleTypesSorting(sort, data.types.currentPageResults || []);
    data.types.currentPageResults = sortedTypes;

    setSortingData(data);
  };

  const fetchAndSort = async (sort: string) => {
    if (sortingData) handleSorting(sort);
    else {
      const { moves, pokemons, types } = await fetchBaseSortingData();
      if (moves && pokemons && types) {
        handleSorting(sort, { moves, pokemons, types });
      }
    }
  };

  const handlePokemonsSortingChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    console.log('seting loading true');
    const value = event.target.value as PokemonsSorting;
    setPokemonsSorting(value);
    await fetchAndSort(value);
    console.log('seting loading false');
    setIsLoading(false);
  };

  const handleTypesSortingChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const value = event.target.value as TypesSorting;
    setTypesSorting(value);
    await fetchAndSort(value);
    setIsLoading(false);
  };

  const handleMovesSortingChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const value = event.target.value as MovesSorting;
    setMovesSorting(value);
    await fetchAndSort(value);
    setIsLoading(false);
  };

  return (
    <S.SelectorWrapper>
      {activeTab === AvailableTabs.pokemons && (
        <>
          <S.SelectorWrapper>
            <S.Label htmlFor="sorting-pokemons">Sort pokemons</S.Label>
            <S.Select value={pokemonsSorting} onChange={handlePokemonsSortingChange} ref={select}>
              <option value={PokemonsSorting.none}>{PokemonsSorting.none}</option>
              <option value={PokemonsSorting.baseExperience}>
                {PokemonsSorting.baseExperience}
              </option>
              <option value={PokemonsSorting.alphabetical}>{PokemonsSorting.alphabetical}</option>
              <option value={PokemonsSorting.height}>{PokemonsSorting.height}</option>
              <option value={PokemonsSorting.weight}>{PokemonsSorting.weight}</option>
            </S.Select>
          </S.SelectorWrapper>
        </>
      )}
      {activeTab === AvailableTabs.moves && (
        <>
          <S.Label htmlFor="sorting-moves">Sort moves</S.Label>
          <S.Select value={movesSorting} onChange={handleMovesSortingChange} ref={select}>
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
          <S.Select value={typesSorting} onChange={handleTypesSortingChange} ref={select}>
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
