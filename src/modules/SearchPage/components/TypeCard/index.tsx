import { PokemonTypeDetails } from 'types';
import * as S from './styled';

type Props = {
  handleTypeSelect: (selectedMove: PokemonTypeDetails) => void;
  handleModalOpened: (opened: boolean) => void;
  type: PokemonTypeDetails;
};

export const TypeCard = ({ type, handleModalOpened, handleTypeSelect }: Props) => {
  const onClick = () => {
    handleTypeSelect(type);
    handleModalOpened(true);
  };
  return (
    <>
      <S.Card onClick={onClick}>
        <p>{type.name}</p>
      </S.Card>
    </>
  );
};
