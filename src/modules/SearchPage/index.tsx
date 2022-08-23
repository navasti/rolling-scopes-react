import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { API, INPUT_VALUE_KEY } from 'appConstants';
import { SearchBar, Tabs, Cards, Pagination, SortingSelector } from './components';
import { useSearchContext } from 'contexts';
import {
  BaseMovesData,
  BasePokemonsData,
  BaseTypesData,
  PokemonDetails,
  PokemonMoveDetails,
  PokemonTypeDetails,
} from 'types';
import { Layout } from 'modules';
import * as S from './styled';
import {
  fetchPokemonByParameter,
  fetchMoveByParameter,
  fetchTypeByParameter,
  fetchBase,
} from 'utils';

type Props = {
  componentName: string;
  location: string;
};

export const SearchPage = ({ componentName, location }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const {
    setLengths,
    setPokemons,
    setMoves,
    setTypes,
    setIsLoading,
    searchState: { lengths },
  } = useSearchContext();

  const shouldSkipFetching = useMemo(
    () => Object.values(lengths).some((value) => value > 0),
    [lengths]
  );

  const fetchData = useCallback(async (allData: boolean, param?: string) => {
    if (!allData && param) {
      const type = await fetchTypeByParameter(`${API.TYPE}/${param}`);
      const move = await fetchMoveByParameter(`${API.MOVE}/${param}`);
      const pokemon = await fetchPokemonByParameter(`${API.POKEMON}/${param}`);
      return {
        pokemons: {
          currentPageResults: pokemon ? [pokemon] : [],
          count: pokemon ? 1 : 0,
          previous: null,
          results: [],
          next: null,
        },
        moves: {
          currentPageResults: move ? [move] : [],
          count: move ? 1 : 0,
          previous: null,
          results: [],
          next: null,
        },
        types: {
          currentPageResults: type ? [type] : [],
          count: type ? 1 : 0,
          previous: null,
          results: [],
          next: null,
        },
        lengths: {
          pokemons: pokemon ? 1 : 0,
          moves: move ? 1 : 0,
          types: type ? 1 : 0,
        },
      };
    }
    if (allData) {
      const pokemons = await fetchBase<BasePokemonsData>(API.POKEMON);
      const moves = await fetchBase<BaseMovesData>(API.MOVE);
      const types = await fetchBase<BaseTypesData>(API.TYPE);
      if (pokemons) {
        pokemons.currentPageResults = await Promise.all(
          pokemons.results.map(({ url }) =>
            fetch(url)
              .then((data) => data.json())
              .then((pokemon: PokemonDetails) => pokemon)
          )
        );
      }
      if (types) {
        types.currentPageResults = await Promise.all(
          types.results.map(({ url }) =>
            fetch(url)
              .then((data) => data.json())
              .then((type: PokemonTypeDetails) => type)
          )
        );
      }
      if (moves) {
        moves.currentPageResults = await Promise.all(
          moves.results.map(({ url }) =>
            fetch(url)
              .then((data) => data.json())
              .then((move: PokemonMoveDetails) => move)
          )
        );
      }
      return {
        pokemons,
        types,
        moves,
        lengths: {
          pokemons: pokemons?.count || 0,
          moves: moves?.count || 0,
          types: types?.count || 0,
        },
      };
    }
  }, []);

  useEffect(() => {
    if (!shouldSkipFetching) {
      setIsLoading(true);
      const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
      inputValue && setInputValue(inputValue);
      const values =
        inputValue && inputValue.trim().length > 0
          ? fetchData(false, inputValue).then((values) => values)
          : fetchData(true).then((values) => values);
      values.then((value) => {
        value?.lengths && setLengths(value.lengths);
        value?.pokemons && setPokemons(value.pokemons);
        value?.moves && setMoves(value.moves);
        value?.types && setTypes(value.types);
        setIsLoading(false);
      });
    }
  }, [fetchData, setPokemons, setTypes, setMoves, setLengths, setIsLoading, shouldSkipFetching]);

  const onKeyDown = async ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      setIsLoading(true);
      const values = !!inputValue.trim().length
        ? await fetchData(false, inputValue)
        : await fetchData(true);
      values?.lengths && setLengths(values.lengths);
      values?.moves && setMoves(values.moves);
      values?.pokemons && setPokemons(values.pokemons);
      values?.types && setTypes(values.types);
      setIsLoading(false);
    }
  };

  const onChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
    window.localStorage.setItem(INPUT_VALUE_KEY, target.value);
  };

  return (
    <Layout componentName={componentName} location={location}>
      <S.SearchPageView>
        <SearchBar
          label="Local Storage Input"
          inputValue={inputValue}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
        <Tabs />
        <Pagination />
        <SortingSelector />
        <Cards />
      </S.SearchPageView>
    </Layout>
  );
};
