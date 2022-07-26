import { PokemonDetails } from 'types';
import { capitalize } from 'utils';
import * as S from './styled';

export const PokemonModalContent = ({ selectedPokemon }: { selectedPokemon: PokemonDetails }) => {
  return (
    <div>
      <S.ParagraphContentProperty>
        <b>Weight:</b> {selectedPokemon.weight}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Height:</b> {selectedPokemon.height}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Base experience:</b> {selectedPokemon.base_experience}
      </S.ParagraphContentProperty>
      <S.DivContentProperty>
        <S.PokemonContentTitle>Pokemon abilities</S.PokemonContentTitle>
        {selectedPokemon.abilities.map((ability) => (
          <p key={ability.ability.name}>
            {capitalize(ability.ability.name)} - hidden: {ability.is_hidden ? 'yes' : 'no'}, slot:{' '}
            {ability.slot}
          </p>
        ))}
      </S.DivContentProperty>
      <S.DivContentProperty>
        <S.PokemonContentTitle>Pokemon statisics</S.PokemonContentTitle>
        {selectedPokemon.stats.map((stat) => (
          <p key={stat.stat.name}>
            {capitalize(stat.stat.name)} - power: {stat.base_stat}, effort: {stat.effort}
          </p>
        ))}
      </S.DivContentProperty>
    </div>
  );
};
