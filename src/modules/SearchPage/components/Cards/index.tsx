import { PokemonCard, MoveCard, TypeCard } from 'modules/SearchPage/components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { useCallback, useState } from 'react';
import { AvailableTabs } from 'appConstants';
import { useSearchContext } from 'contexts';
import { DetailsModal } from 'modules';
import { Loader } from 'components';
import * as S from './styled';

type Props = {
  activeTab: AvailableTabs;
};

export const Cards = ({ activeTab }: Props) => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [selectedType, setSelectedType] = useState<PokemonTypeDetails | null>(null);
  const [selectedMove, setSelectedMove] = useState<PokemonMoveDetails | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const {
    searchState: { pokemons, types, moves, isLoading },
  } = useSearchContext();

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
    setSelectedType(null);
    setSelectedMove(null);
    setIsModalOpened(false);
  }, []);

  if (isLoading) return <Loader />;

  const renderSwitch = (param: AvailableTabs) => {
    switch (param) {
      case AvailableTabs.pokemons:
        return !!pokemons.length ? (
          pokemons.map((pokemon) => <PokemonCard pokemon={pokemon} key={pokemon.id} />)
        ) : (
          <S.NoDataInfo>No pokemons were found</S.NoDataInfo>
        );
      case AvailableTabs.moves:
        return !!moves.length ? (
          moves.map((move) => <MoveCard key={move.id} move={move} />)
        ) : (
          <S.NoDataInfo>No moves were found</S.NoDataInfo>
        );
      case AvailableTabs.types:
        return !!types.length ? (
          types.map((type) => <TypeCard key={type.id} type={type} />)
        ) : (
          <S.NoDataInfo>No types were found</S.NoDataInfo>
        );
      default:
        return <></>;
    }
  };

  return (
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
      />
      {renderSwitch(activeTab)}
    </S.CardsWrapper>
  );
};
