import { PokemonTypeDetails } from 'types';
import { NONE } from 'appConstants';
import * as S from './styled';

type Props = {
  type: PokemonTypeDetails;
};

export const TypeCardDetails = ({ type: { damage_relations, moves, pokemon } }: Props) => {
  const damageContent = [
    { id: 1, label: 'Double damage from', array: damage_relations.double_damage_from },
    { id: 2, label: 'Double damage to', array: damage_relations.double_damage_to },
    { id: 3, label: 'Half damage from', array: damage_relations.half_damage_from },
    { id: 4, label: 'Half damage to', array: damage_relations.half_damage_to },
    { id: 5, label: 'No damage from', array: damage_relations.no_damage_from },
    { id: 6, label: 'No damage to', array: damage_relations.no_damage_to },
  ];
  return (
    <S.CardWrapper>
      {damageContent.map(({ array, label, id }) => (
        <S.DetailedProperty key={id}>
          <b>{label}:</b> {!!array.length ? array.map(({ name }) => name).join(', ') : NONE}
        </S.DetailedProperty>
      ))}
      <S.DetailedProperty>
        <b>Moves:</b> {!!moves.length ? moves.map(({ name }) => name).join(', ') : NONE}
      </S.DetailedProperty>
      <S.DetailedProperty>
        <b>Pokemons:</b>{' '}
        {!!pokemon.length ? pokemon.map(({ pokemon: { name } }) => name).join(', ') : NONE}
      </S.DetailedProperty>
    </S.CardWrapper>
  );
};
