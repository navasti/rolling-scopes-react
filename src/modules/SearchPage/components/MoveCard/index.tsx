import { PokemonMoveDetails } from 'types';
import * as S from './styled';

type Props = {
  handleMoveSelect: (selectedMove: PokemonMoveDetails) => void;
  handleModalOpened: (opened: boolean) => void;
  move: PokemonMoveDetails;
};

export const MoveCard = ({ move, handleModalOpened, handleMoveSelect }: Props) => {
  const onClick = () => {
    handleMoveSelect(move);
    setTimeout(() => handleModalOpened(true), 0);
  };
  return (
    <S.Card onClick={onClick}>
      <div>{move.name}</div>
    </S.Card>
  );
};
