import { PokemonModalContent, MoveModalContent, TypeModalContent } from './components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { Modal } from 'components';

type Props = {
  handleModalOpened: (isModalOpened: boolean) => void;
  selectedType?: PokemonTypeDetails;
  selectedMove?: PokemonMoveDetails;
  selectedPokemon?: PokemonDetails;
  isModalOpened: boolean;
};

export const DetailsModal = (props: Props) => {
  const { handleModalOpened, isModalOpened, selectedMove, selectedPokemon, selectedType } = props;
  const title = selectedPokemon?.name || selectedMove?.name || selectedType?.name || '';
  return (
    <Modal handleModalOpened={handleModalOpened} opened={isModalOpened} title={title}>
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
