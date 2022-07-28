import { capitalize, appendComma } from 'utils';
import { PokemonDetails } from 'types';
import * as S from './styled';

type Props = {
  selectedPokemon: PokemonDetails;
};

export const PokemonModalContent = ({ selectedPokemon }: Props) => {
  const { abilities, types, base_experience, height, stats, weight } = selectedPokemon;
  const baseContent = [
    { id: 1, label: 'Weight', value: weight },
    { id: 2, label: 'Height', value: height },
    { id: 3, label: 'Base experience', value: base_experience },
  ];
  return (
    <div>
      {baseContent.map(({ id, label, value }) => (
        <S.ParagraphContentProperty key={id}>
          <b>{label}:</b> {value}
        </S.ParagraphContentProperty>
      ))}

      <S.ParagraphContentProperty>
        <b>Types:</b> {types.map(({ type }, index) => appendComma(types.length, index, type.name))}
      </S.ParagraphContentProperty>

      <S.DivContentProperty>
        <S.PokemonContentTitle>Pokemon abilities:</S.PokemonContentTitle>
        {abilities.map(({ ability, is_hidden, slot }) => (
          <p key={ability.name}>
            {capitalize(ability.name)} - hidden: {is_hidden ? 'yes' : 'no'}, slot: {slot}
          </p>
        ))}
      </S.DivContentProperty>

      <S.DivContentProperty>
        <S.PokemonContentTitle>Pokemon statistics:</S.PokemonContentTitle>
        {stats.map(({ base_stat, effort, stat }) => (
          <p key={stat.name}>
            {capitalize(stat.name)} - power: {base_stat}, effort: {effort}
          </p>
        ))}
      </S.DivContentProperty>
    </div>
  );
};
