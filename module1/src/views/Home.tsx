import { Pokemon, PokemonData, PokemonDetails } from 'types';
import { API_URL, INPUT_VALUE_KEY } from 'appConstants';
import { Cards, SearchBar } from 'components';
import React, { ChangeEvent } from 'react';
import * as Styled from './styled';

interface State {
  pokemons: Array<PokemonDetails>;
  inputValue: string;
  isLoading: boolean;
}

export class Home extends React.Component<unknown, State> {
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
    fetch(API_URL)
      .then((response) => response.json())
      .then(({ results }: PokemonData) => {
        const detailed = results.map(async (pokemon: Pokemon) => {
          const data: PokemonDetails = await fetch(pokemon.url).then((res) => res.json());
          return data;
        });
        Promise.all(detailed).then((pokemons) => this.setState({ pokemons }));
      })
      .catch((error) => console.error(error))
      .finally(() => setTimeout(() => this.setState({ isLoading: false }), 1000));
  }
  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ inputValue: value });
    window.localStorage.setItem(INPUT_VALUE_KEY, value);
  };
  render() {
    const { inputValue, isLoading, pokemons } = this.state;
    return (
      <Styled.HomeViewLayout>
        <SearchBar onChange={this.onChange} label="Local Storage Input" inputValue={inputValue} />
        {!isLoading && !pokemons.length ? (
          <Styled.CommonMessage>No pokemons found</Styled.CommonMessage>
        ) : (
          <Cards isLoading={isLoading} pokemons={pokemons} />
        )}
      </Styled.HomeViewLayout>
    );
  }
}
