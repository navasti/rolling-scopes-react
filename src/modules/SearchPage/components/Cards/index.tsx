import { PokemonCard, MoveCard, TypeCard } from 'modules/SearchPage/components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { AvailableTabs } from 'appConstants';
import { useCallback, useRef, useState } from 'react';
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
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>();
  const [selectedType, setSelectedType] = useState<PokemonTypeDetails | null>();
  const [selectedMove, setSelectedMove] = useState<PokemonMoveDetails | null>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const pokemonModalRef = useRef<HTMLDivElement>(null);
  const moveModalRef = useRef<HTMLDivElement>(null);
  const typeModalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = useCallback(() => setIsModalOpened(false), []);
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
          {activeTab === AvailableTabs.pokemons ? (
            <>
              {pokemons.length > 0 ? (
                <>
                  {selectedPokemon && (
                    <DetailsModal
                      handleCloseModal={handleCloseModal}
                      selectedPokemon={selectedPokemon}
                      isModalOpened={isModalOpened}
                      ref={pokemonModalRef}
                    />
                  )}
                  {pokemons.map((pokemon) => (
                    <PokemonCard
                      handlePokemonSelect={(pokemon: PokemonDetails) => setSelectedPokemon(pokemon)}
                      handleOpenModal={handleOpenModal}
                      pokemon={pokemon}
                      key={pokemon.id}
                    />
                  ))}
                </>
              ) : (
                <S.NoDataInfo>No pokemons were found</S.NoDataInfo>
              )}
            </>
          ) : activeTab === AvailableTabs.moves ? (
            <>
              {moves.length > 0 ? (
                <>
                  {selectedMove && (
                    <DetailsModal
                      handleCloseModal={handleCloseModal}
                      isModalOpened={isModalOpened}
                      selectedMove={selectedMove}
                      ref={moveModalRef}
                    />
                  )}
                  {moves.map((move) => (
                    <MoveCard
                      handleMoveSelect={(move: PokemonMoveDetails) => setSelectedMove(move)}
                      handleOpenModal={handleOpenModal}
                      move={move}
                      key={move.id}
                    />
                  ))}
                </>
              ) : (
                <S.NoDataInfo>No moves were found</S.NoDataInfo>
              )}
            </>
          ) : activeTab === AvailableTabs.types ? (
            <>
              {types.length > 0 ? (
                <>
                  {selectedType && (
                    <DetailsModal
                      handleCloseModal={handleCloseModal}
                      isModalOpened={isModalOpened}
                      selectedType={selectedType}
                      ref={typeModalRef}
                    />
                  )}
                  {types.map((type) => (
                    <TypeCard
                      handleTypeSelect={(type: PokemonTypeDetails) => setSelectedType(type)}
                      handleOpenModal={handleOpenModal}
                      key={type.id}
                      type={type}
                    />
                  ))}
                </>
              ) : (
                <S.NoDataInfo>No types were found</S.NoDataInfo>
              )}
            </>
          ) : null}
        </S.CardsWrapper>
      )}
    </>
  );
};
