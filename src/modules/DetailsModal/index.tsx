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
  handleModalOpened: (isModalOpened: boolean) => void;
  selectedType?: PokemonTypeDetails;
  selectedMove?: PokemonMoveDetails;
  selectedPokemon?: PokemonDetails;
  isModalOpened: boolean;
};

export const DetailsModal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { isModalOpened, selectedMove, selectedPokemon, selectedType, handleModalOpened } = props;
  return (
    <Modal handleModalOpened={handleModalOpened} opened={isModalOpened} ref={ref}>
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
});
