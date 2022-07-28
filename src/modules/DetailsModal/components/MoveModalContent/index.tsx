import { PokemonMoveDetails } from 'types';
import { appendComma } from 'utils';
import * as S from './styled';

type Props = {
  selectedMove: PokemonMoveDetails;
};

export const MoveModalContent = ({ selectedMove }: Props) => {
  const { accuracy, learned_by_pokemon, power, pp, priority, type } = selectedMove;
  const baseContent = [
    { id: 1, label: 'Accuracy', value: accuracy },
    { id: 2, label: 'Type', value: type.name },
    { id: 3, label: 'Power', value: power },
    { id: 4, label: 'Priority', value: priority },
    { id: 5, label: 'PP', value: pp },
  ];
  return (
    <div>
      {baseContent.map(({ id, label, value }) => (
        <S.ParagraphContentProperty key={id}>
          <b>{label}:</b> {value}
        </S.ParagraphContentProperty>
      ))}

      <S.ParagraphContentProperty>
        <b>Learned by:</b>{' '}
        {learned_by_pokemon.map(({ name }, index) =>
          appendComma(learned_by_pokemon.length, index, name)
        )}
      </S.ParagraphContentProperty>
    </div>
  );
};
