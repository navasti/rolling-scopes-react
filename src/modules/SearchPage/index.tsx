import { AvailableTabs, API, INPUT_VALUE_KEY, tabs } from 'appConstants';
import { fetchPokemonByParameter, fetchDetails, fetchBase } from 'utils';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { SearchBar, Tabs, Cards } from './components';
import { Layout } from 'modules';
import * as S from './styled';
import {
  PokemonTypeDetails,
  PokemonMoveDetails,
  PokemonDetails,
  PokemonData,
  PokemonMove,
  PokemonType,
  MovesData,
  TypesData,
  Pokemon,
  Lengths,
} from 'types';

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
      fetchAndSetSpecificData(inputValue).then(() => setTimeout(() => setIsLoading(false), 500));
    } else fetchAndSetAllData().then(() => setTimeout(() => setIsLoading(false), 500));
  }, []);

  const fetchAndSetSpecificData = async (value: string) => {
    const type = await fetchPokemonByParameter<PokemonTypeDetails>(`${API.TYPE}/${value}`);
    const move = await fetchPokemonByParameter<PokemonMoveDetails>(`${API.MOVE}/${value}`);
    const pokemon = await fetchPokemonByParameter<PokemonDetails>(`${API.POKEMON}/${value}`);
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
    const pokemons = await fetchBase<PokemonData, Pokemon>(`${API.POKEMON}${API.POKEMON_LIMIT}`);
    const pokemonsDetailed = await fetchDetails<Pokemon, PokemonDetails>(pokemons);
    const moves = await fetchBase<MovesData, PokemonMove>(`${API.MOVE}${API.MOVE_LIMIT}`);
    const movesDetailed = await fetchDetails<PokemonMove, PokemonMoveDetails>(moves);
    const types = await fetchBase<TypesData, PokemonType>(`${API.TYPE}${API.TYPE_LIMIT}`);
    const typesDetailed = await fetchDetails<PokemonType, PokemonTypeDetails>(types);
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
      inputValue.trim().length > 0
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
          options={tabs}
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
