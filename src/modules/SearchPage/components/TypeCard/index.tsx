import { PokemonTypeDetails } from 'types';
import * as S from './styled';

type Props = {
  handleTypeSelect: (selectedMove: PokemonTypeDetails) => void;
  handleOpenModal: () => void;
  type: PokemonTypeDetails;
};

export const TypeCard = ({ type, handleOpenModal, handleTypeSelect }: Props) => {
  const onClick = () => {
    handleTypeSelect(type);
    handleOpenModal();
  };
  return (
    <S.Card onClick={onClick} data-testid="type-card">
      <p>{type.name}</p>
    </S.Card>
  );
};
