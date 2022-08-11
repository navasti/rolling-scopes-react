import { PokemonModalContent, MoveModalContent, TypeModalContent } from './components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { Modal } from 'components';
import * as S from './styled';

type Props = {
  handleModalOpened: (isModalOpened: boolean) => void;
  selectedType?: PokemonTypeDetails;
  selectedMove?: PokemonMoveDetails;
  selectedPokemon?: PokemonDetails;
  isModalOpened: boolean;
};

export const DetailsModal = (props: Props) => {
  const { handleModalOpened, isModalOpened, selectedMove, selectedPokemon, selectedType } = props;
  return (
    <Modal handleModalOpened={handleModalOpened} opened={isModalOpened}>
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
        <></>
      )}
    </Modal>
  );
};
