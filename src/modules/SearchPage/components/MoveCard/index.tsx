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
    handleModalOpened(true);
  };
  return (
    <S.Card onClick={onClick}>
      <p>{move.name}</p>
    </S.Card>
  );
};
