import { fetchDetailedPokemons, fetchPokemons } from 'utils';
import { API_URL, INPUT_VALUE_KEY } from 'appConstants';
import { SearchBar, Card } from './components';
import React, { ChangeEvent } from 'react';
import { PokemonDetails } from 'types';
import { Loader } from 'components';
import { Layout } from 'modules';
import * as S from './styled';

type Props = {
  componentName: string;
  location: string;
};

type State = {
  pokemons: Array<PokemonDetails>;
  inputValue: string;
  isLoading: boolean;
};

export class SearchPage extends React.Component<Props, State> {
  state: State = {
    isLoading: true,
    inputValue: '',
    pokemons: [],
  };
  componentDidMount() {
    const value = window.localStorage.getItem(INPUT_VALUE_KEY);
    if (value != null) {
      this.setState({ inputValue: value });
    }
    fetchPokemons(API_URL)
      .then((pokemons) => fetchDetailedPokemons(pokemons))
      .then((pokemons) => this.setState({ pokemons }))
      .finally(() => setTimeout(() => this.setState({ isLoading: false }), 1000));
  }
  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ inputValue: value });
    window.localStorage.setItem(INPUT_VALUE_KEY, value);
  };
  render() {
    const { inputValue, isLoading, pokemons } = this.state;
    const { componentName, location } = this.props;
    return (
      <Layout componentName={componentName} location={location}>
        <S.SearchPageView>
          <SearchBar onChange={this.onChange} label="Local Storage Input" inputValue={inputValue} />
          {!isLoading && !pokemons.length ? (
            <S.CommonMessage>No pokemons found</S.CommonMessage>
          ) : (
            <S.CardsWrapper isLoading={isLoading}>
              {isLoading ? (
                <Loader />
              ) : (
                pokemons.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)
              )}
            </S.CardsWrapper>
          )}
        </S.SearchPageView>
      </Layout>
    );
  }
}
