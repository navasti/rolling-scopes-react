import { useMoveContext, usePokemonContext, useSearchContext, useTypeContext } from 'contexts';
import { SearchBar, Tabs, PokemonView, MoveView, TypeView } from './components';
import { AvailableTabs, INPUT_VALUE_KEY } from 'appConstants';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Loader } from 'components';
import { Layout } from 'modules';
import * as S from './styled';

type Props = {
  componentName: string;
  location: string;
};

export const SearchPage = ({ componentName, location }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const {
    setSearchingResults,
    searchState: { activeTab, isLoading },
  } = useSearchContext();

  const {
    pokemonState: { allDataResults: allPokemons },
  } = usePokemonContext();

  const {
    typeState: { allDataResults: allTypes },
  } = useTypeContext();

  const {
    moveState: { allDataResults: allMoves },
  } = useMoveContext();

  const onKeyDown = async ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      if (!!inputValue.trim().length) {
        const moves = allMoves.filter((move) => move.name.includes(inputValue));
        const types = allTypes.filter((type) => type.name.includes(inputValue));
        const pokemons = allPokemons.filter((pokemon) => pokemon.name.includes(inputValue));
        setSearchingResults({
          moves,
          types,
          pokemons,
          lengths: {
            pokemons: pokemons.length,
            moves: moves.length,
            types: types.length,
          },
        });
      } else setSearchingResults(null);
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {activeTab === AvailableTabs.pokemons && <PokemonView />}
            {activeTab === AvailableTabs.moves && <MoveView />}
            {activeTab === AvailableTabs.types && <TypeView />}
          </>
        )}
      </S.SearchPageView>
    </Layout>
  );
};
