import { usePokemonData } from 'hooks/usePokemonData';
import { AvailableTabs, TABS } from 'appConstants';
import { useMoveData, useTypeData } from 'hooks';
import { useSearchContext } from 'contexts';
import * as S from './styled';

export const Tabs = () => {
  const {
    setActiveTab,
    searchState: { isLoading, activeTab },
  } = useSearchContext();

  const { totalResults: totalPokemons } = usePokemonData();
  const { totalResults: totalTypes } = useTypeData();
  const { totalResults: totalMoves } = useMoveData();

  const onClick = (option: AvailableTabs) => setActiveTab(option);

  return (
    <S.TabsWrapper>
      {TABS.map((option) => (
        <S.Tab active={option === activeTab} key={option} onClick={() => onClick(option)}>
          {option}{' '}
          {!isLoading &&
            `(${
              option === AvailableTabs.pokemons
                ? totalPokemons
                : option === AvailableTabs.moves
                ? totalMoves
                : option === AvailableTabs.types
                ? totalTypes
                : 0
            })`}
        </S.Tab>
      ))}
    </S.TabsWrapper>
  );
};
