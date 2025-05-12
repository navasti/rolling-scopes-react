import { PokemonMoveDetails } from 'types';
import * as S from './styled';

type Props = {
  move: PokemonMoveDetails;
};

export const MoveCardDetails = ({ move }: Props) => {
  const { accuracy, learned_by_pokemon, power, pp, priority, type, name } = move;
  const baseContent = [
    { id: 1, label: 'Name', value: name },
    { id: 2, label: 'Type', value: type.name },
    { id: 3, label: 'Power', value: Number(power) },
    { id: 4, label: 'Priority', value: Number(priority) },
    { id: 5, label: 'PP', value: Number(pp) },
    { id: 6, label: 'Accuracy', value: Number(accuracy) },
  ];
  return (
    <S.CardWrapper>
      {baseContent.map(({ id, label, value }) => (
        <S.DetailedProperty key={id}>
          <b>{label}:</b> {value}
        </S.DetailedProperty>
      ))}
      <S.DetailedProperty>
        <b>Learned by: </b>
        {learned_by_pokemon.length
          ? learned_by_pokemon.map(({ name }) => name).join(', ')
          : 'nobody'}
      </S.DetailedProperty>
    </S.CardWrapper>
  );
};
