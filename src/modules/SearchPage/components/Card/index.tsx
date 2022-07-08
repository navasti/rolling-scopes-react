import { PokemonDetails } from 'types';
import * as S from './styled';
import React from 'react';

type Props = {
  pokemon: PokemonDetails;
};

export class Card extends React.Component<Props, unknown> {
  render() {
    const { pokemon } = this.props;
    return (
      <S.Card title="card">
        <S.ImageWrapper title="image-wrapper">
          <S.Image role="img" src={pokemon.sprites.front_default} alt={pokemon.name} />
          <S.BaseInformation title="base">
            <S.Title title="base-title">Base:</S.Title>
            <S.Paragraph>Name: {pokemon.name}</S.Paragraph>
            <S.Paragraph>
              Types:{' '}
              {pokemon.types.map(({ type }, index) => {
                const isLast = pokemon.types.length === index + 1;
                return (
                  <span key={`${pokemon.name}-${type.name}`}>
                    {type.name}
                    {!isLast && ', '}
                  </span>
                );
              })}
            </S.Paragraph>
            <S.Paragraph>Base experience: {pokemon.base_experience}</S.Paragraph>
            <S.Paragraph>Weight: {pokemon.weight}</S.Paragraph>
            <S.Paragraph>Height: {pokemon.height}</S.Paragraph>
          </S.BaseInformation>
        </S.ImageWrapper>
        <S.Abilities title="abilities">
          <S.Title title="abilities-title">Pokemon abilities</S.Title>
          {pokemon.abilities.map((ability) => (
            <S.Paragraph key={`${pokemon.id}-${ability.ability.name}`}>
              {ability.ability.name.toUpperCase()}, hidden: {ability.is_hidden ? 'yes' : 'no'},
              slot: {ability.slot}
            </S.Paragraph>
          ))}
        </S.Abilities>
        <S.Stats title="stats">
          <S.Title title="stats-title">Pokemon statisics</S.Title>
          {pokemon.stats.map((stat) => (
            <S.Paragraph key={`${pokemon.id}-${stat.stat.name}`}>
              {stat.stat.name.toUpperCase()}, power: {stat.base_stat}, effort: {stat.effort}
            </S.Paragraph>
          ))}
        </S.Stats>
      </S.Card>
    );
  }
}
