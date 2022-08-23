import { API, AvailableTabs, Limits } from 'appConstants';
import { MouseEvent, useEffect, useState } from 'react';
import { usePaginationRange, DOTS } from 'hooks';
import { useSearchContext } from 'contexts';
import { fetchAndMap } from 'utils';
import * as S from './styled';

export const Pagination = () => {
  const [totalPageCount, setTotalPageCount] = useState(0);

  const { setPage, setPokemons, setIsLoading, setMoves, setTypes, searchState } =
    useSearchContext();
  const { activeTab, isLoading, lengths, moves, page, pokemons, sorting, types } = searchState;

  const paginationRange = usePaginationRange({
    currentPage: page,
    siblingCount: 3,
    buttonConst: 3,
    totalPageCount,
  });

  useEffect(() => {
    activeTab === AvailableTabs.pokemons &&
      setTotalPageCount(Math.ceil(pokemons.count / Limits.pokemon));
    activeTab === AvailableTabs.moves && setTotalPageCount(Math.ceil(moves.count / Limits.move));
    activeTab === AvailableTabs.types && setTotalPageCount(Math.ceil(types.count / Limits.type));
  }, [activeTab, pokemons, moves, types]);

  const goToNextPage = async () => {
    setIsLoading(true);
    if (activeTab === AvailableTabs.pokemons && pokemons.next) {
      const pokemonsData = await fetchAndMap.pokemons(pokemons.next);
      pokemonsData && setPokemons(pokemonsData);
    }
    if (activeTab === AvailableTabs.moves && moves.next) {
      const movesData = await fetchAndMap.moves(moves.next);
      movesData && setMoves(movesData);
    }
    if (activeTab === AvailableTabs.types && types.next) {
      const typesData = await fetchAndMap.types(types.next);
      typesData && setTypes(typesData);
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
