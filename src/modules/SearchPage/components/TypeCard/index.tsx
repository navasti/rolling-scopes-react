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
    setTimeout(() => handleModalOpened(true), 0);
  };
  return (
    <>
      <S.Card onClick={onClick}>
        <div>{type.name}</div>
      </S.Card>
    </>
  );
};
