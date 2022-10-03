import { AvailableCardDetails, PokemonMoveDetails } from 'types';
import { useNavigate } from 'react-router-dom';
import * as S from '../styled';

type Props = {
  move: PokemonMoveDetails;
};

export const MoveCard = ({ move }: Props) => {
  const navigation = useNavigate();
  const handleCardClick = () => {
    navigation(`details/${AvailableCardDetails.move}/${move.id}`, { replace: true });
  };
  return (
    <S.Card onClick={handleCardClick} data-testid="move-card" align="center">
      <p>{move.name}</p>
    </S.Card>
  );
};
