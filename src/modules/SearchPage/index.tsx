import { useMoveContext, usePokemonContext, useSearchContext, useTypeContext } from 'contexts';
import { SearchBar, Tabs, PokemonView, MoveView, TypeView } from './components';
import { AvailableTabs, INPUT_VALUE_KEY, Limits } from 'appConstants';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
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
    searchState: { activeTab, isLoading },
  } = useSearchContext();

  const {
    setCurrentPage: setPokemonPage,
    setSearchResults: setFoundPokemons,
    setCurrentPageResults: setCurrentPokemons,
    pokemonState: { allDataResults: allPokemons },
  } = usePokemonContext();

  const {
    setCurrentPage: setTypePage,
    setSearchResults: setFoundTypes,
    setCurrentPageResults: setCurrentTypes,
    typeState: { allDataResults: allTypes },
  } = useTypeContext();

  const {
    setCurrentPage: setMovePage,
    setSearchResults: setFoundMoves,
    setCurrentPageResults: setCurrentMoves,
    moveState: { allDataResults: allMoves },
  } = useMoveContext();

  const onKeyDown = async ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      if (!!inputValue.trim().length) {
        const typeDetails = allTypes.filter((item) => item.name.includes(inputValue));
        const moveDetails = allMoves.filter((item) => item.name.includes(inputValue));
        const pokemonDetails = allPokemons.filter((item) => item.name.includes(inputValue));
        setFoundTypes(typeDetails);
        setFoundMoves(moveDetails);
        setFoundPokemons(pokemonDetails);
        setCurrentMoves(moveDetails.slice(0, Limits.move));
        setCurrentTypes(typeDetails.slice(0, Limits.type));
        setCurrentPokemons(pokemonDetails.slice(0, Limits.pokemon));
      } else {
        setTypePage(1);
        setMovePage(1);
        setPokemonPage(1);
        setFoundTypes(null);
        setFoundMoves(null);
        setFoundPokemons(null);
        setCurrentMoves(allMoves.slice(0, Limits.move));
        setCurrentTypes(allTypes.slice(0, Limits.type));
        setCurrentPokemons(allPokemons.slice(0, Limits.pokemon));
      }
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
