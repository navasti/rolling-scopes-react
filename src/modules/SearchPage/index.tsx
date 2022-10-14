import { searchResultsAsync, searchResultsSync } from 'features/resources/resourcesSlice';
import { SearchBar, Tabs, PokemonView, MoveView, TypeView } from './components';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { AvailableTabs, INPUT_VALUE_KEY } from 'appConstants';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Layout } from 'modules';
import * as S from './styled';

type Props = {
  componentName: string;
  location: string;
};

export const SearchPage = ({ componentName, location }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const activeTab = useAppSelector((state) => state.tabs.activeTab);

  const { moveResultsAmount, typeResultsAmount, pokemonResultsAmount } = useAppSelector(
    (state) => state.resources
  );

  useEffect(() => {
    const value = window.localStorage.getItem(INPUT_VALUE_KEY);
    value && setInputValue(value);
  }, []);

  const onKeyDown = async ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      if (!!inputValue.trim().length) {
        dispatch(searchResultsSync({ inputValue }));
      } else {
        dispatch(
          searchResultsAsync({ moveResultsAmount, pokemonResultsAmount, typeResultsAmount })
        );
      }
    }
  };

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
    window.localStorage.setItem(INPUT_VALUE_KEY, target.value);
  };

  return (
    <Layout componentName={componentName} location={location}>
      <S.SearchPageView>
        <SearchBar
          label="Local Storage Input"
          inputDisabled={false}
          inputValue={inputValue}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
        <Tabs />
        {activeTab === AvailableTabs.pokemons && <PokemonView />}
        {activeTab === AvailableTabs.moves && <MoveView />}
        {activeTab === AvailableTabs.types && <TypeView />}
      </S.SearchPageView>
    </Layout>
  );
};
