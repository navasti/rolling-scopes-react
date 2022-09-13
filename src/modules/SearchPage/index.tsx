import { SearchBar, Tabs, PokemonView, MoveView, TypeView } from './components';
import { MoveSorting, PokemonSorting, SearchResults, TypeSorting } from 'types';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { AvailableTabs, INPUT_VALUE_KEY } from 'appConstants';
import { useGlobalContext } from 'contexts/globalContext';
import { Loader } from 'components';
import { Layout } from 'modules';
import * as S from './styled';

type Props = {
  componentName: string;
  location: string;
};

export const SearchPage = ({ componentName, location }: Props) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const value = window.localStorage.getItem(INPUT_VALUE_KEY);
    value && setInputValue(value);
  }, []);

  const {
    setAllData,
    state: { allDataResults, resultsAmount, isLoading, activeTab },
  } = useGlobalContext();

  const onKeyDown = async ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      const isValueValid = !!inputValue.trim().length;
      const searchResults: SearchResults = {
        moves: null,
        pokemons: null,
        types: null,
      };
      if (isValueValid) {
        searchResults.types = allDataResults.types.filter((item) => item.name.includes(inputValue));
        searchResults.moves = allDataResults.moves.filter((item) => item.name.includes(inputValue));
        searchResults.pokemons = allDataResults.pokemons.filter((item) =>
          item.name.includes(inputValue)
        );
      }
      const { moves, pokemons, types } = searchResults;
      setAllData({
        currentPokemons: (pokemons || allDataResults.pokemons).slice(0, resultsAmount.pokemons),
        currentMoves: (moves || allDataResults.moves).slice(0, resultsAmount.moves),
        currentTypes: (types || allDataResults.types).slice(0, resultsAmount.types),
        currentPage: { moves: 1, pokemons: 1, types: 1 },
        searchResults,
        sorting: {
          pokemons: PokemonSorting.none,
          moves: MoveSorting.none,
          types: TypeSorting.none,
        },
      });
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
          inputDisabled={isLoading}
          inputValue={inputValue}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
        <Tabs />
        {isLoading && <Loader />}
        {!isLoading && activeTab === AvailableTabs.pokemons && <PokemonView />}
        {!isLoading && activeTab === AvailableTabs.moves && <MoveView />}
        {!isLoading && activeTab === AvailableTabs.types && <TypeView />}
      </S.SearchPageView>
    </Layout>
  );
};
