import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { AvailableTabs, API, INPUT_VALUE_KEY, TABS } from 'appConstants';
import { SearchBar, Tabs, Cards } from './components';
import { useGlobalContext } from 'contexts';
import { GlobalState } from 'types';
import { Layout } from 'modules';
import * as S from './styled';
import {
  fetchPokemonByParameter,
  fetchMoveByParameter,
  fetchTypeByParameter,
  fetchPokemonDetails,
  fetchPokemonBase,
  fetchMoveDetails,
  fetchTypeDetails,
  fetchTypeBase,
  fetchMoveBase,
} from 'utils';

type Props = {
  componentName: string;
  location: string;
};

export const SearchPage = ({ componentName, location }: Props) => {
  const [activeTab, setActiveTab] = useState<AvailableTabs>(AvailableTabs.pokemons);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { setLengths, setPokemons, setMoves, setTypes } = useGlobalContext();

  const fetchData = useCallback(async (allData: boolean, param?: string) => {
    const values: Pick<GlobalState, 'lengths' | 'moves' | 'pokemons' | 'types'> = {
      pokemons: [],
      types: [],
      moves: [],
      lengths: {
        moves: 0,
        pokemons: 0,
        types: 0,
      },
    };
    if (!allData && param) {
      const type = await fetchTypeByParameter(`${API.TYPE}/${param}`);
      const move = await fetchMoveByParameter(`${API.MOVE}/${param}`);
      const pokemon = await fetchPokemonByParameter(`${API.POKEMON}/${param}`);
      pokemon && values.pokemons.push(pokemon);
      type && values.types.push(type);
      move && values.moves.push(move);
    }
    if (allData) {
      const pokemons = (await fetchPokemonBase(`${API.POKEMON}${API.POKEMON_LIMIT}`)) || [];
      const moves = (await fetchMoveBase(`${API.MOVE}${API.MOVE_LIMIT}`)) || [];
      const types = (await fetchTypeBase(`${API.TYPE}${API.TYPE_LIMIT}`)) || [];
      values.pokemons = [...((await fetchPokemonDetails(pokemons)) || [])];
      values.types = [...((await fetchTypeDetails(types)) || [])];
      values.moves = [...((await fetchMoveDetails(moves)) || [])];
    }
    values.lengths = {
      pokemons: values.pokemons.length,
      moves: values.moves.length,
      types: values.types.length,
    };
    return values;
  }, []);

  useEffect(() => {
    console.log('useEffect');
    const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
    inputValue && setInputValue(inputValue);
    const values =
      inputValue && inputValue.trim().length > 0
        ? fetchData(false, inputValue).then((values) => values)
        : fetchData(true).then((values) => values);
    values.then(({ lengths, moves, pokemons, types }) => {
      setPokemons(pokemons);
      setLengths(lengths);
      setMoves(moves);
      setTypes(types);
      setIsLoading(false);
    });
  }, [fetchData, setPokemons, setTypes, setMoves, setLengths]);

  const onKeyDown = async ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      setIsLoading(true);
      const { lengths, moves, pokemons, types } = !!inputValue.trim().length
        ? await fetchData(false, inputValue)
        : await fetchData(true);
      setPokemons(pokemons);
      setLengths(lengths);
      setMoves(moves);
      setTypes(types);
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
          isLoading={isLoading}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
        <Tabs
          onClick={(tab: AvailableTabs) => setActiveTab(tab)}
          isLoading={isLoading}
          activeTab={activeTab}
          options={TABS}
        />
        <Cards isLoading={isLoading} activeTab={activeTab} />
      </S.SearchPageView>
    </Layout>
  );
};
