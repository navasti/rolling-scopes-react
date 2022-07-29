import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { Modal } from 'components';
import { forwardRef } from 'react';
import * as S from './styled';
import {
  PokemonModalContent,
  MoveModalContent,
  TypeModalContent,
} from 'modules/DetailsModal/components';

type Props = {
  selectedType?: PokemonTypeDetails;
  selectedMove?: PokemonMoveDetails;
  selectedPokemon?: PokemonDetails;
  handleCloseModal: () => void;
  isModalOpened: boolean;
};

export const DetailsModal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { handleCloseModal, isModalOpened, selectedMove, selectedPokemon, selectedType } = props;
  return (
    <>
      {selectedPokemon ? (
        <Modal handleCloseModal={handleCloseModal} opened={isModalOpened} ref={ref}>
          <S.ModalTitle>{selectedPokemon.name}</S.ModalTitle>
          <PokemonModalContent selectedPokemon={selectedPokemon} />
        </Modal>
      ) : selectedMove ? (
        <Modal handleCloseModal={handleCloseModal} opened={isModalOpened} ref={ref}>
          <S.ModalTitle>{selectedMove.name}</S.ModalTitle>
          <MoveModalContent selectedMove={selectedMove} />
        </Modal>
      ) : selectedType ? (
        <Modal handleCloseModal={handleCloseModal} opened={isModalOpened} ref={ref}>
          <S.ModalTitle>{selectedType.name}</S.ModalTitle>
          <TypeModalContent selectedType={selectedType} />
        </Modal>
      ) : null}
    </>
  );
});
