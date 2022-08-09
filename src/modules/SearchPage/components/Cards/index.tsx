import { PokemonCard, MoveCard, TypeCard } from 'modules/SearchPage/components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { useCallback, useRef, useState } from 'react';
import { AvailableTabs } from 'appConstants';
import { DetailsModal } from 'modules';
import { Loader } from 'components';
import * as S from './styled';

type Props = {
  types: Array<PokemonTypeDetails>;
  moves: Array<PokemonMoveDetails>;
  pokemons: Array<PokemonDetails>;
  activeTab: AvailableTabs;
  isLoading: boolean;
};

export const Cards = ({ activeTab, isLoading, moves, pokemons, types }: Props) => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | undefined>();
  const [selectedType, setSelectedType] = useState<PokemonTypeDetails | undefined>();
  const [selectedMove, setSelectedMove] = useState<PokemonMoveDetails | undefined>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(undefined);
    setSelectedType(undefined);
    setSelectedMove(undefined);
    setIsModalOpened(false);
  }, []);
  const handleOpenModal = useCallback(() => setIsModalOpened(true), []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <S.CardsWrapper
          min={activeTab === AvailableTabs.pokemons ? '190px' : '130px'}
          center={activeTab !== AvailableTabs.pokemons}
          isLoading={isLoading}
        >
          <DetailsModal
            handleCloseModal={handleCloseModal}
            selectedPokemon={selectedPokemon}
            isModalOpened={isModalOpened}
            selectedMove={selectedMove}
            selectedType={selectedType}
            ref={modalRef}
          />
          {activeTab === AvailableTabs.pokemons ? (
            pokemons.length > 0 ? (
              pokemons.map((pokemon) => (
                <PokemonCard
                  handlePokemonSelect={(pokemon: PokemonDetails) => setSelectedPokemon(pokemon)}
                  handleOpenModal={handleOpenModal}
                  pokemon={pokemon}
                  key={pokemon.id}
                />
              ))
            ) : (
              <S.NoDataInfo>No pokemons were found</S.NoDataInfo>
            )
          ) : activeTab === AvailableTabs.moves ? (
            moves.length > 0 ? (
              moves.map((move) => (
                <MoveCard
                  handleMoveSelect={(move: PokemonMoveDetails) => setSelectedMove(move)}
                  handleOpenModal={handleOpenModal}
                  key={move.id}
                  move={move}
                />
              ))
            ) : (
              <S.NoDataInfo>No moves were found</S.NoDataInfo>
            )
          ) : activeTab === AvailableTabs.types ? (
            types.length > 0 ? (
              types.map((type) => (
                <TypeCard
                  handleTypeSelect={(type: PokemonTypeDetails) => setSelectedType(type)}
                  handleOpenModal={handleOpenModal}
                  key={type.id}
                  type={type}
                />
              ))
            ) : (
              <S.NoDataInfo>No types were found</S.NoDataInfo>
            )
          ) : null}
        </S.CardsWrapper>
      )}
    </>
  );
};
