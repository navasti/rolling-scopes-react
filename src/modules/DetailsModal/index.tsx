import { PokemonModalContent, MoveModalContent, TypeModalContent } from './components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { Modal } from 'components';
import * as S from './styled';

type Props = {
  selectedType?: PokemonTypeDetails;
  selectedMove?: PokemonMoveDetails;
  selectedPokemon?: PokemonDetails;
  handleCloseModal: () => void;
  isModalOpened: boolean;
};

export const DetailsModal = (props: Props) => {
  const { handleCloseModal, isModalOpened, selectedMove, selectedPokemon, selectedType } = props;
  return (
    <>
      <Modal handleCloseModal={handleCloseModal} opened={isModalOpened}>
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
};
