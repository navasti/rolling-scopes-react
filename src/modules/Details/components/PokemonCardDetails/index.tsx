import { PokemonDetails } from 'types';
import { capitalize } from 'utils';
import * as S from './styled';

type Props = {
  pokemon: PokemonDetails;
};

export const PokemonCardDetails = ({ pokemon }: Props) => {
  const { abilities, types, base_experience, height, stats, weight, name, sprites } = pokemon;

  const singleLineData = [
    { id: 1, label: 'Weight', value: weight },
    { id: 2, label: 'Height', value: height },
    { id: 3, label: 'Base experience', value: base_experience },
  ];

  return (
    <S.CardWrapper>
      <S.BaseInformationWrapper>
        <S.BaseInformationImage src={sprites.front_default} alt={name} width="180" height="180" />
        <S.BaseInformationTitle>{name}</S.BaseInformationTitle>
      </S.BaseInformationWrapper>

      <div>
        {singleLineData.map(({ id, label, value }) => (
          <S.DetailProperty key={id}>
            <b>{label}:</b> {value}
          </S.DetailProperty>
        ))}

        <S.DetailProperty>
          <b>Types:</b> {types.map(({ type }) => type.name).join(', ')}
        </S.DetailProperty>

        <S.DetailWrapper>
          <S.DetailTitle>Pokemon abilities:</S.DetailTitle>
          {abilities.map(({ ability, is_hidden, slot }) => (
            <p key={ability.name}>
              {capitalize(ability.name)} - hidden: {is_hidden ? 'yes' : 'no'}, slot: {slot}
            </p>
          ))}
        </S.DetailWrapper>

        <S.DetailWrapper>
          <S.DetailTitle>Pokemon statistics:</S.DetailTitle>
          {stats.map(({ base_stat, effort, stat }) => (
            <p key={stat.name}>
              {capitalize(stat.name)} - power: {base_stat}, effort: {effort}
            </p>
          ))}
        </S.DetailWrapper>
      </div>
    </S.CardWrapper>
  );
};
