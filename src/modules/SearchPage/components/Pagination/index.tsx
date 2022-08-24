import { usePaginationRange, DOTS, useMemoizedData } from 'hooks';
import { API, AvailableTabs, Limits } from 'appConstants';
import { MouseEvent, useEffect, useState } from 'react';
import { useSearchContext } from 'contexts';
import { BaseSortingData } from 'types';
import { fetchAndMap } from 'utils';
import * as S from './styled';

export const Pagination = () => {
  const [totalPageCount, setTotalPageCount] = useState(0);

  const {
    setPage,
    setMoves,
    setTypes,
    setPokemons,
    searchState,
    setIsLoading,
    setCurrentTypeResults,
    setCurrentMoveResults,
    setCurrentPokemonResults,
  } = useSearchContext();
  const { activeTab, moves, page, pokemons, types, sortingData } = searchState;

  const { movesData, pokemonData, typesData } = useMemoizedData();

  const paginationRange = usePaginationRange({
    currentPage: page,
    siblingCount: 3,
    buttonConst: 3,
    totalPageCount,
  });

  useEffect(() => {
    activeTab === AvailableTabs.pokemons &&
      setTotalPageCount(Math.ceil(pokemonData.count / Limits.pokemon));
    activeTab === AvailableTabs.moves &&
      setTotalPageCount(Math.ceil(movesData.count / Limits.move));
    activeTab === AvailableTabs.types &&
      setTotalPageCount(Math.ceil(typesData.count / Limits.type));
  }, [activeTab, pokemonData, movesData, typesData]);

  const goToNextPage = async () => {
    setIsLoading(true);
    if (activeTab === AvailableTabs.pokemons) {
      if (!sortingData) {
        const pokemonsData = pokemons?.next && (await fetchAndMap.pokemons(pokemons.next));
        pokemonsData && setPokemons(pokemonsData);
      } else {
        const copy: BaseSortingData = structuredClone(sortingData);
        const index = page * Limits.pokemon;
        const sliced = copy.pokemons.results.slice(index, index * 2);
        setCurrentPokemonResults(sliced);
      }
    }
    if (activeTab === AvailableTabs.moves) {
      if (!sortingData) {
        const movesData = moves?.next && (await fetchAndMap.moves(moves.next));
        movesData && setMoves(movesData);
      } else {
        const copy: BaseSortingData = structuredClone(sortingData);
        const index = page * Limits.move;
        const sliced = copy.moves.results.slice(index, index * 2);
        setCurrentMoveResults(sliced);
      }
    }
    if (activeTab === AvailableTabs.types) {
      if (!sortingData) {
        const typesData = types?.next && (await fetchAndMap.types(types.next));
        typesData && setTypes(typesData);
      } else {
        const copy: BaseSortingData = structuredClone(sortingData);
        const index = page * Limits.type;
        const sliced = copy.types.results.slice(index, index * 2);
        setCurrentTypeResults(sliced);
      }
    }
    setPage(page + 1);
    setIsLoading(false);
  };

  const gotToPreviousPage = async () => {
    setIsLoading(true);
    if (activeTab === AvailableTabs.pokemons && pokemons.previous) {
      const pokemonsData = await fetchAndMap.pokemons(pokemons.previous);
      pokemonsData && setPokemons(pokemonsData);
    }
    if (activeTab === AvailableTabs.moves && moves.previous) {
      const movesData = await fetchAndMap.moves(moves.previous);
      movesData && setMoves(movesData);
    }
    if (activeTab === AvailableTabs.types && types.previous) {
      const typesData = await fetchAndMap.types(types.previous);
      typesData && setTypes(typesData);
    }
    setPage(page - 1);
    setIsLoading(false);
  };

  const changePage = async (event: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    const pageNumber = Number(event.currentTarget?.textContent);
    if (activeTab === AvailableTabs.pokemons) {
      const url = `${API.POKEMON}${API.POKEMON_LIMIT}&${API.getPokemonsOffset(pageNumber)}`;
      const pokemonsData = await fetchAndMap.pokemons(url);
      pokemonsData && setPokemons(pokemonsData);
    }
    if (activeTab === AvailableTabs.moves) {
      const url = `${API.MOVE}${API.MOVE_LIMIT}&${API.getMovesOffset(pageNumber)}`;
      const movesData = await fetchAndMap.moves(url);
      movesData && setMoves(movesData);
    }
    if (activeTab === AvailableTabs.types) {
      const url = `${API.TYPE}${API.TYPE_LIMIT}&${API.getTypesOffset(pageNumber)}`;
      const typesData = await fetchAndMap.types(url);
      typesData && setTypes(typesData);
    }
    setPage(pageNumber);
    setIsLoading(false);
  };

  return (
    <S.Pagination>
      <S.PaginationButton onClick={gotToPreviousPage} disabled={page === 1}>
        👈
      </S.PaginationButton>

      {paginationRange?.map((item, index) =>
        item === DOTS ? (
          <S.PaginationButton key={index}>{DOTS}</S.PaginationButton>
        ) : (
          <S.PaginationButton key={index} onClick={changePage} active={page === item}>
            <span>{item}</span>
          </S.PaginationButton>
        )
      )}

      <S.PaginationButton onClick={goToNextPage} disabled={page === totalPageCount}>
        👉
      </S.PaginationButton>
    </S.Pagination>
  );
};
