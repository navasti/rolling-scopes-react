import { useMoveContext, usePokemonContext, useSearchContext, useTypeContext } from 'contexts';
import { SearchBar, Tabs, PokemonView, MoveView, TypeView } from './components';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { AvailableTabs, INPUT_VALUE_KEY } from 'appConstants';
import { MoveSorting, PokemonSorting, TypeSorting } from 'types';
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
    setSorting: setPokemonSorting,
    setCurrentPage: setPokemonPage,
    setSearchResults: setFoundPokemons,
    setCurrentPageResults: setCurrentPokemons,
    pokemonState: { allDataResults: allPokemons, resultsAmount: pokemonAmount },
  } = usePokemonContext();

  const {
    setSorting: setTypeSorting,
    setCurrentPage: setTypePage,
    setSearchResults: setFoundTypes,
    setCurrentPageResults: setCurrentTypes,
    typeState: { allDataResults: allTypes, resultsAmount: typesAmount },
  } = useTypeContext();

  const {
    setSorting: setMoveSorting,
    setCurrentPage: setMovePage,
    setSearchResults: setFoundMoves,
    setCurrentPageResults: setCurrentMoves,
    moveState: { allDataResults: allMoves, resultsAmount: moveAmount },
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
        setCurrentMoves(moveDetails.slice(0, moveAmount));
        setCurrentTypes(typeDetails.slice(0, typesAmount));
        setCurrentPokemons(pokemonDetails.slice(0, pokemonAmount));
      } else {
        setFoundTypes(null);
        setFoundMoves(null);
        setFoundPokemons(null);
        setCurrentMoves(allMoves.slice(0, moveAmount));
        setCurrentTypes(allTypes.slice(0, typesAmount));
        setCurrentPokemons(allPokemons.slice(0, pokemonAmount));
      }
      setTypePage(1);
      setMovePage(1);
      setPokemonPage(1);
      setMoveSorting(MoveSorting.none);
      setTypeSorting(TypeSorting.none);
      setPokemonSorting(PokemonSorting.none);
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
