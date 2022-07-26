import { PokemonTypeDetails } from 'types';
import * as S from './styled';

export const TypeModalContent = ({ selectedType }: { selectedType: PokemonTypeDetails }) => {
  const {
    double_damage_from,
    double_damage_to,
    half_damage_from,
    half_damage_to,
    no_damage_from,
    no_damage_to,
  } = selectedType.damage_relations;
  return (
    <div>
      <S.ParagraphContentProperty>
        <b>Double damage from:</b>{' '}
        {double_damage_from.length > 0
          ? double_damage_from.map(({ name }, index) => {
              const isLast = selectedType.damage_relations.double_damage_from.length === index + 1;
              return `${name}${isLast ? '.' : ', '}`;
            })
          : 'none.'}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Double damage to:</b>{' '}
        {double_damage_to.length > 0
          ? double_damage_to.map(({ name }, index) => {
              const isLast = selectedType.damage_relations.double_damage_to.length === index + 1;
              return `${name}${isLast ? '.' : ', '}`;
            })
          : 'none.'}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Half damage from:</b>{' '}
        {half_damage_from.length > 0
          ? half_damage_from.map(({ name }, index) => {
              const isLast = selectedType.damage_relations.half_damage_from.length === index + 1;
              return `${name}${isLast ? '.' : ', '}`;
            })
          : 'none.'}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Half damage to:</b>{' '}
        {half_damage_to.length > 0
          ? half_damage_to.map(({ name }, index) => {
              const isLast = selectedType.damage_relations.half_damage_to.length === index + 1;
              return `${name}${isLast ? '.' : ', '}`;
            })
          : 'none.'}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>No damage from:</b>{' '}
        {no_damage_from.length > 0
          ? no_damage_from.map(({ name }, index) => {
              const isLast = selectedType.damage_relations.no_damage_from.length === index + 1;
              return `${name}${isLast ? '.' : ', '}`;
            })
          : 'none.'}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>No damage to:</b>{' '}
        {no_damage_to.length > 0
          ? no_damage_to.map(({ name }, index) => {
              const isLast = selectedType.damage_relations.no_damage_to.length === index + 1;
              return `${name}${isLast ? '.' : ', '}`;
            })
          : 'none.'}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Moves:</b>{' '}
        {selectedType.moves.map(({ name }, index) => {
          const isLast = selectedType.moves.length === index + 1;
          return `${name}${isLast ? '.' : ', '}`;
        })}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Pokemons:</b>{' '}
        {selectedType.pokemon.map((item, index) => {
          const isLast = selectedType.pokemon.length === index + 1;
          return `${item.pokemon.name}${isLast ? '.' : ', '}`;
        })}
      </S.ParagraphContentProperty>
    </div>
  );
};
