import { PokemonCard, MoveCard, TypeCard } from 'modules/SearchPage/components';
import { AvailableTabs } from 'appConstants';
import { useSearchContext } from 'contexts';
import { useMemoizedData } from 'hooks';
import { Loader } from 'components';
import * as S from './styled';

export const Cards = () => {
  const {
    searchState: { activeTab, isLoading },
  } = useSearchContext();

  const { movesData, pokemonData, typesData } = useMemoizedData();

  if (isLoading) return <Loader />;

  return (
    <S.CardsWrapper
      min={activeTab === AvailableTabs.pokemons ? '190px' : '130px'}
      center={activeTab !== AvailableTabs.pokemons}
      isLoading={isLoading}
    >
      {AvailableTabs.pokemons === activeTab &&
        (!!pokemonData?.currentPageResults?.length ? (
          pokemonData.currentPageResults.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <S.NoDataInfo>No pokemons were found</S.NoDataInfo>
        ))}

      {AvailableTabs.moves === activeTab &&
        (!!movesData?.currentPageResults?.length ? (
          movesData.currentPageResults.map((move) => <MoveCard key={move.id} move={move} />)
        ) : (
          <S.NoDataInfo>No moves were found</S.NoDataInfo>
        ))}

      {AvailableTabs.types === activeTab &&
        (!!typesData?.currentPageResults?.length ? (
          typesData.currentPageResults.map((type) => <TypeCard key={type.id} type={type} />)
        ) : (
          <S.NoDataInfo>No types were found</S.NoDataInfo>
        ))}
    </S.CardsWrapper>
  );
};
