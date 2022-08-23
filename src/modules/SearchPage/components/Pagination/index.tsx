import { MouseEvent, useEffect, useState } from 'react';
import { usePaginationRange, DOTS } from 'hooks';
import { useSearchContext } from 'contexts';
import * as S from './styled';
import { BasePokemonsData, PokemonDetails } from 'types';
import { API, AvailableTabs } from 'appConstants';
import { fetchBase } from 'utils';

const fPk = async (url: string) => {
  console.log(url);
  const data = (await fetchBase<BasePokemonsData>(url)) || null;
  if (data) {
    data.currentPageResults = await Promise.all(
      (data?.results || []).map(({ url }) =>
        fetch(url)
          .then((data) => data.json())
          .then((pokemon: PokemonDetails) => pokemon)
      )
    );
  }
  return data;
};

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
    console.log('useeffect');
    activeTab === AvailableTabs.pokemons && setTotalPageCount(Math.ceil(pokemons.count / 20));
    activeTab === AvailableTabs.moves && setTotalPageCount(Math.ceil(moves.count / 15));
    activeTab === AvailableTabs.types && setTotalPageCount(Math.ceil(types.count / 10));
  }, [activeTab, pokemons, moves, types]);

  const goToNextPage = async () => {
    setIsLoading(true);
    if (activeTab === AvailableTabs.pokemons && pokemons.next) {
      const pokemonsData = await fPk(pokemons.next);
      if (pokemonsData) {
        setPokemons(pokemonsData);
        setPage(page + 1);
      }
    }
    setIsLoading(false);
  };

  const gotToPreviousPage = async () => {
    setIsLoading(true);
    if (activeTab === AvailableTabs.pokemons && pokemons.previous) {
      const pokemonsData = await fPk(pokemons.previous);
      if (pokemonsData) {
        setPokemons(pokemonsData);
        setPage(page - 1);
      }
    }
    setIsLoading(false);
  };

  const changePage = async (event: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    const pageNumber = Number(event.currentTarget?.textContent);
    if (activeTab === AvailableTabs.pokemons) {
      const pokemonsData = await fPk(
        `${API.POKEMON}${API.POKEMON_LIMIT}&offset=${pageNumber * 20 - 20}`
      );
      if (pokemonsData) {
        setPokemons(pokemonsData);
        setPage(pageNumber);
      }
    }
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
