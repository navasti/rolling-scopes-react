import { PokemonMoveDetails } from 'types';
import * as S from './styled';

export const MoveModalContent = ({ selectedMove }: { selectedMove: PokemonMoveDetails }) => {
  return (
    <div>
      <S.ParagraphContentProperty>
        <b>Accuracy:</b> {selectedMove.accuracy}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Type:</b> {selectedMove.type.name}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Power:</b> {selectedMove.power}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Priority:</b> {selectedMove.priority}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>PP:</b> {selectedMove.pp}
      </S.ParagraphContentProperty>
      <S.ParagraphContentProperty>
        <b>Learned by:</b>{' '}
        {selectedMove.learned_by_pokemon.map(({ name }, index) => {
          const isLast = selectedMove.learned_by_pokemon.length === index + 1;
          return `${name}${isLast ? '.' : ', '}`;
        })}
      </S.ParagraphContentProperty>
    </div>
  );
};
