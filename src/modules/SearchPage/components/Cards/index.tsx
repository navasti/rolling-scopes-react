import { PokemonCard, MoveCard, TypeCard } from 'modules/SearchPage/components';
import { AvailableTabs } from 'appConstants';
import { useSearchContext } from 'contexts';
import { Loader } from 'components';
import * as S from './styled';

export const Cards = () => {
  const {
    searchState: { pokemons, types, moves, activeTab, isLoading },
  } = useSearchContext();

  if (isLoading) return <Loader />;

  const carsRenderSwitch = (param: AvailableTabs) => {
    switch (param) {
      case AvailableTabs.pokemons:
        return !!pokemons?.currentPageResults?.length ? (
          pokemons.currentPageResults.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <S.NoDataInfo>No pokemons were found</S.NoDataInfo>
        );
      case AvailableTabs.moves:
        return !!moves?.currentPageResults?.length ? (
          moves.currentPageResults.map((move) => <MoveCard key={move.id} move={move} />)
        ) : (
          <S.NoDataInfo>No moves were found</S.NoDataInfo>
        );
      case AvailableTabs.types:
        return !!types?.currentPageResults?.length ? (
          types.currentPageResults.map((type) => <TypeCard key={type.id} type={type} />)
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
      {carsRenderSwitch(activeTab)}
    </S.CardsWrapper>
  );
};
