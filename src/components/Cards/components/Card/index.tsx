import { PokemonDetails } from 'types';
import * as Styled from './styled';
import React from 'react';

interface Props {
  pokemon: PokemonDetails;
}

export class Card extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { pokemon } = this.props;
    return (
      <Styled.Card>
        <Styled.ImageWrapper title="image-wrapper">
          <Styled.Image role="img" src={pokemon.sprites.front_default} alt={pokemon.name} />
          <Styled.BaseInformation title="base">
            <Styled.Title title="base-title">Base:</Styled.Title>
            <Styled.Paragraph>Name: {pokemon.name}</Styled.Paragraph>
            <Styled.Paragraph>
              Types:{' '}
              {pokemon.types.map(({ type }, index) => {
                const isLast = pokemon.types.length === index + 1;
                return (
                  <span key={`${pokemon.name}-${type.name}`}>
                    {type.name}
                    {isLast ? '' : ', '}
                  </span>
                );
              })}
            </Styled.Paragraph>
            <Styled.Paragraph>Base experience: {pokemon.base_experience}</Styled.Paragraph>
            <Styled.Paragraph>Weight: {pokemon.weight}</Styled.Paragraph>
            <Styled.Paragraph>Height: {pokemon.height}</Styled.Paragraph>
          </Styled.BaseInformation>
        </Styled.ImageWrapper>
        <Styled.Abilities title="abilities">
          <Styled.Title title="abilities-title">Pokemon abilities</Styled.Title>
          {pokemon.abilities.map((ability) => (
            <Styled.Paragraph key={`${pokemon.id}-${ability.ability.name}`}>
              {ability.ability.name.toUpperCase()}, hidden: {ability.is_hidden ? 'yes' : 'no'},
              slot: {ability.slot}
            </Styled.Paragraph>
          ))}
        </Styled.Abilities>
        <Styled.Stats title="stats">
          <Styled.Title title="stats-title">Pokemon statisics</Styled.Title>
          {pokemon.stats.map((stat) => (
            <Styled.Paragraph key={`${pokemon.id}-${stat.stat.name}`}>
              {stat.stat.name.toUpperCase()}, power: {stat.base_stat}, effort: {stat.effort}
            </Styled.Paragraph>
          ))}
        </Styled.Stats>
      </Styled.Card>
    );
  }
}
