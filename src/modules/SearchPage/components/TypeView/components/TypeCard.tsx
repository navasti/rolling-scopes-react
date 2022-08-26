import { AvailableCardDetails, PokemonTypeDetails } from 'types';
import { useNavigate } from 'react-router-dom';
import * as S from '../styled';

type Props = {
  type: PokemonTypeDetails;
};

export const TypeCard = ({ type }: Props) => {
  const navigation = useNavigate();
  const onClick = () => {
    navigation(`details/${AvailableCardDetails.type}/${type.id}`, { replace: true });
  };
  return (
    <S.Card onClick={onClick} data-testid="type-card" align="center">
      <p>{type.name}</p>
    </S.Card>
  );
};
