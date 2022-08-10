import { PokemonTypeDetails } from 'types';
import { NONE } from 'appConstants';
import * as S from './styled';

type Props = {
  selectedType: PokemonTypeDetails;
};

export const TypeModalContent = ({ selectedType }: Props) => {
  const { damage_relations, moves, pokemon } = selectedType;
  const damageContent = [
    { id: 1, label: 'Double damage from', array: damage_relations.double_damage_from },
    { id: 2, label: 'Double damage to', array: damage_relations.double_damage_to },
    { id: 3, label: 'Half damage from', array: damage_relations.half_damage_from },
    { id: 4, label: 'Half damage to', array: damage_relations.half_damage_to },
    { id: 5, label: 'No damage from', array: damage_relations.no_damage_from },
    { id: 6, label: 'No damage to', array: damage_relations.no_damage_to },
  ];
  return (
    <div>
      {damageContent.map(({ array, label, id }) => (
        <S.ParagraphContentProperty key={id}>
          <b>{label}:</b> {!!array.length ? array.map(({ name }) => name).join(', ') : NONE}
        </S.ParagraphContentProperty>
      ))}
      <S.ParagraphContentProperty>
        <b>Moves:</b> {!!moves.length ? moves.map(({ name }) => name).join(', ') : NONE}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Pokemons:</b>{' '}
        {!!pokemon.length ? pokemon.map(({ pokemon: { name } }) => name).join(', ') : NONE}
      </S.ParagraphContentProperty>
    </div>
  );
};
