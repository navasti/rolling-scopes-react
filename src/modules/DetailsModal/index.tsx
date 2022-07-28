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
  return (
    <>
      {props.selectedPokemon ? (
        <Modal handleModalOpened={props.handleModalOpened} opened={props.isModalOpened} ref={ref}>
          <S.ModalTitle>{props.selectedPokemon.name}</S.ModalTitle>
          <PokemonModalContent selectedPokemon={props.selectedPokemon} />
        </Modal>
      ) : props.selectedMove ? (
        <Modal handleModalOpened={props.handleModalOpened} opened={props.isModalOpened} ref={ref}>
          <S.ModalTitle>{props.selectedMove.name}</S.ModalTitle>
          <MoveModalContent selectedMove={props.selectedMove} />
        </Modal>
      ) : props.selectedType ? (
        <Modal handleModalOpened={props.handleModalOpened} opened={props.isModalOpened} ref={ref}>
          <S.ModalTitle>{props.selectedType.name}</S.ModalTitle>
          <TypeModalContent selectedType={props.selectedType} />
        </Modal>
      ) : null}
    </>
  );
});
