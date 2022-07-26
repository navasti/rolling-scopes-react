import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { forwardRef } from 'react';
import { Modal } from 'components';
import * as S from './styled';
import {
  PokemonModalContent,
  MoveModalContent,
  TypeModalContent,
} from 'modules/DetailsModal/components';

type Props = {
  handleModalOpened: (isModalOpened: boolean) => void;
  selectedType?: PokemonTypeDetails;
  selectedMove?: PokemonMoveDetails;
  selectedPokemon?: PokemonDetails;
  isModalOpened: boolean;
};

export const DetailsModal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { isModalOpened, selectedMove, selectedPokemon, selectedType, handleModalOpened } = props;
  return (
    <>
      {selectedPokemon ? (
        <Modal handleModalOpened={handleModalOpened} opened={isModalOpened} ref={ref}>
          <S.ModalTitle>{selectedPokemon.name}</S.ModalTitle>
          <PokemonModalContent selectedPokemon={selectedPokemon} />
        </Modal>
      ) : selectedMove ? (
        <Modal handleModalOpened={handleModalOpened} opened={isModalOpened} ref={ref}>
          <S.ModalTitle>{selectedMove.name}</S.ModalTitle>
          <MoveModalContent selectedMove={selectedMove} />
        </Modal>
      ) : selectedType ? (
        <Modal handleModalOpened={handleModalOpened} opened={isModalOpened} ref={ref}>
          <S.ModalTitle>{selectedType.name}</S.ModalTitle>
          <TypeModalContent selectedType={selectedType} />
        </Modal>
      ) : null}
    </>
  );
});
