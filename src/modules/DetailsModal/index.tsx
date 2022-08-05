import { PokemonModalContent, MoveModalContent, TypeModalContent } from './components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { Modal } from 'components';
import { forwardRef } from 'react';
import * as S from './styled';

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
      <Modal handleCloseModal={handleCloseModal} opened={isModalOpened} ref={ref}>
        <S.ModalTitle>
          {selectedPokemon
            ? selectedPokemon.name
            : selectedMove
            ? selectedMove.name
            : selectedType
            ? selectedType.name
            : null}
        </S.ModalTitle>
        {selectedPokemon ? (
          <PokemonModalContent selectedPokemon={selectedPokemon} />
        ) : selectedMove ? (
          <MoveModalContent selectedMove={selectedMove} />
        ) : selectedType ? (
          <TypeModalContent selectedType={selectedType} />
        ) : (
          <div></div>
        )}
      </Modal>
    </>
  );
});
