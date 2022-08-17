import { PokemonModalContent, MoveModalContent, TypeModalContent } from './components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { Modal } from 'components';

type Props = {
  selectedType?: PokemonTypeDetails | null;
  selectedMove?: PokemonMoveDetails | null;
  selectedPokemon?: PokemonDetails | null;
  handleCloseModal: () => void;
  isModalOpened: boolean;
};

export const DetailsModal = (props: Props) => {
  const { handleCloseModal, isModalOpened, selectedMove, selectedPokemon, selectedType } = props;
  const title = selectedPokemon?.name || selectedMove?.name || selectedType?.name || '';
  return (
    <Modal handleCloseModal={handleCloseModal} opened={isModalOpened} title={title}>
      {selectedPokemon ? (
        <PokemonModalContent selectedPokemon={selectedPokemon} />
      ) : selectedMove ? (
        <MoveModalContent selectedMove={selectedMove} />
      ) : selectedType ? (
        <TypeModalContent selectedType={selectedType} />
      ) : (
        <></>
      )}
    </Modal>
  );
};
