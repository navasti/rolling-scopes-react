import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { SearchBar, Tabs, Cards, Pagination, SortingSelector } from './components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { fetchAndMap, fetchByParam, prepareBaseData } from 'utils';
import { API, INPUT_VALUE_KEY } from 'appConstants';
import { useSearchContext } from 'contexts';
import { Layout } from 'modules';
import * as S from './styled';

type Props = {
  componentName: string;
  location: string;
};

export const SearchPage = ({ componentName, location }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const {
    setTypes,
    setMoves,
    setLengths,
    setPokemons,
    setIsLoading,
    searchState: { lengths },
  } = useSearchContext();

  const shouldSkipFetching = useMemo(
    () => Object.values(lengths).some((value) => value > 0),
    [lengths]
  );

  const fetchData = useCallback(async (allData: boolean, param?: string) => {
    if (!allData && param) {
      const fetchedPokemon = await fetchByParam.pokemon(`${API.POKEMON}/${param}`);
      const fetchedType = await fetchByParam.type(`${API.TYPE}/${param}`);
      const fetchedMove = await fetchByParam.move(`${API.MOVE}/${param}`);
      const pokemons = prepareBaseData<PokemonDetails>(fetchedPokemon);
      const moves = prepareBaseData<PokemonMoveDetails>(fetchedMove);
      const types = prepareBaseData<PokemonTypeDetails>(fetchedType);
      return {
        pokemons,
        moves,
        types: prepareBaseData<PokemonTypeDetails>(fetchedType),
        lengths: {
          pokemons: pokemons.count,
          moves: moves.count,
          types: types.count,
        },
      };
    }
    if (allData) {
      const pokemons = await fetchAndMap.pokemons(`${API.POKEMON}${API.POKEMON_LIMIT}`);
      const moves = await fetchAndMap.moves(`${API.MOVE}${API.MOVE_LIMIT}`);
      const types = await fetchAndMap.types(`${API.TYPE}${API.TYPE_LIMIT}`);
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
    const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
    inputValue && setInputValue(inputValue);
    if (!shouldSkipFetching) {
      setIsLoading(true);
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
        <SortingSelector />
        <Tabs />
        <Pagination />
        <Cards />
      </S.SearchPageView>
    </Layout>
  );
};
