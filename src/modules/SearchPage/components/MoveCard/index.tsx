import { PokemonMoveDetails } from 'types';
import * as S from './styled';

type Props = {
  handleMoveSelect: (selectedMove: PokemonMoveDetails) => void;
  handleOpenModal: () => void;
  move: PokemonMoveDetails;
};

export const MoveCard = ({ move, handleOpenModal, handleMoveSelect }: Props) => {
  const onClick = () => {
    handleMoveSelect(move);
    setTimeout(() => handleOpenModal(), 0);
  };
  return (
    <S.Card onClick={onClick} data-testid="move-card">
      <p>{move.name}</p>
    </S.Card>
  );
};
