import { useNavigate } from 'react-router-dom';
import { AvailableCardDetails, PokemonMoveDetails } from 'types';
import * as S from './styled';

type Props = {
  move: PokemonMoveDetails;
};

export const MoveCard = ({ move }: Props) => {
  const navigation = useNavigate();
  const onClick = () => {
    navigation(`details/${AvailableCardDetails.move}/${move.id}`, { replace: true });
  };
  return (
    <S.Card onClick={onClick} data-testid="move-card" align="center">
      <p>{move.name}</p>
    </S.Card>
  );
};
