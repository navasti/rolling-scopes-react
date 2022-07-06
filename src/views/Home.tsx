import { INPUT_VALUE_KEY } from 'appConstants';
import { Cards, SearchBar } from 'components';
import { fetchDetailedPokemons } from 'utils';
import React, { ChangeEvent } from 'react';
import { PokemonDetails } from 'types';
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
    fetchDetailedPokemons()
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
