import { PokemonDetails } from 'types';
import * as S from './styled';
import React from 'react';

type Props = {
  pokemon: PokemonDetails;
};

export const Card = ({ pokemon }: Props) => {
  return (
    <S.Card>
      <S.ImageWrapper>
        <S.Image role="img" src={pokemon.sprites.front_default} alt={pokemon.name} />
        <S.BaseInformation>
          <S.Title>Base:</S.Title>
          <p>Name: {pokemon.name}</p>
          <p>
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
          </p>
          <p>Base experience: {pokemon.base_experience}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Height: {pokemon.height}</p>
        </S.BaseInformation>
      </S.ImageWrapper>
      <S.Abilities>
        <S.Title>Pokemon abilities</S.Title>
        {pokemon.abilities.map((ability) => (
          <p key={`${pokemon.id}-${ability.ability.name}`}>
            {ability.ability.name.toUpperCase()}, hidden: {ability.is_hidden ? 'yes' : 'no'}, slot:{' '}
            {ability.slot}
          </p>
        ))}
      </S.Abilities>
      <S.Stats>
        <S.Title>Pokemon statisics</S.Title>
        {pokemon.stats.map((stat) => (
          <p key={`${pokemon.id}-${stat.stat.name}`}>
            {stat.stat.name.toUpperCase()}, power: {stat.base_stat}, effort: {stat.effort}
          </p>
        ))}
      </S.Stats>
    </S.Card>
  );
};
