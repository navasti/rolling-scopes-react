import { PokemonTypeDetails, PokemonMoveDetails, PokemonDetails, Lengths } from 'types';
import { AvailableTabs, API, INPUT_VALUE_KEY, TABS } from 'appConstants';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { SearchBar, Tabs, Cards } from './components';
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
  const [lengths, setLengths] = useState<Lengths>({ moves: 0, pokemons: 0, types: 0 });
  const [activeTab, setActiveTab] = useState<AvailableTabs>(AvailableTabs.pokemons);
  const [pokemons, setPokemons] = useState<Array<PokemonDetails>>([]);
  const [moves, setMoves] = useState<Array<PokemonMoveDetails>>([]);
  const [types, setTypes] = useState<Array<PokemonTypeDetails>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
    if (inputValue && inputValue.trim().length > 0) {
      setInputValue(inputValue);
      fetchAndSetSpecificData(inputValue).then(() => setIsLoading(false));
    } else fetchAndSetAllData().then(() => setIsLoading(false));
  }, []);

  const fetchAndSetSpecificData = async (value: string) => {
    const type = await fetchTypeByParameter(`${API.TYPE}/${value}`);
    const move = await fetchMoveByParameter(`${API.MOVE}/${value}`);
    const pokemon = await fetchPokemonByParameter(`${API.POKEMON}/${value}`);
    setPokemons(pokemon ? [pokemon] : []);
    setTypes(type ? [type] : []);
    setMoves(move ? [move] : []);
    setLengths({
      pokemons: pokemon ? 1 : 0,
      moves: move ? 1 : 0,
      types: type ? 1 : 0,
    });
  };

  const fetchAndSetAllData = async () => {
    const pokemons = (await fetchPokemonBase(`${API.POKEMON}${API.POKEMON_LIMIT}`)) || [];
    const pokemonsDetailed = (await fetchPokemonDetails(pokemons)) || [];
    const moves = (await fetchMoveBase(`${API.MOVE}${API.MOVE_LIMIT}`)) || [];
    const movesDetailed = (await fetchMoveDetails(moves)) || [];
    const types = (await fetchTypeBase(`${API.TYPE}${API.TYPE_LIMIT}`)) || [];
    const typesDetailed = (await fetchTypeDetails(types)) || [];
    setPokemons(pokemonsDetailed);
    setTypes(typesDetailed);
    setMoves(movesDetailed);
    setLengths({
      pokemons: pokemonsDetailed.length,
      moves: movesDetailed.length,
      types: typesDetailed.length,
    });
  };

  const onKeyDown = async ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      setIsLoading(true);
      !!inputValue.trim().length
        ? await fetchAndSetSpecificData(inputValue)
        : await fetchAndSetAllData();
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
          lengths={lengths}
          options={TABS}
        />
        <Cards
          isLoading={isLoading}
          activeTab={activeTab}
          pokemons={pokemons}
          types={types}
          moves={moves}
        />
      </S.SearchPageView>
    </Layout>
  );
};
