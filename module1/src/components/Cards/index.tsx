import React from 'react';
import * as Styled from './styled';
import { Card } from './components';
import { Loader } from 'components';
import { PokemonDetails } from 'types';

interface Props {
  isLoading: boolean;
  pokemons: Array<PokemonDetails>;
}

export class Cards extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { pokemons, isLoading } = this.props;
    return (
      <Styled.CardsWrapper isLoading={isLoading}>
        {isLoading ? (
          <Loader />
        ) : (
          pokemons.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)
        )}
      </Styled.CardsWrapper>
    );
  }
}
