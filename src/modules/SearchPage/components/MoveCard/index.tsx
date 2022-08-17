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
    handleOpenModal();
  };
  return (
    <S.Card onClick={onClick} data-testid="move-card" align="center">
      <p>{move.name}</p>
    </S.Card>
  );
};
