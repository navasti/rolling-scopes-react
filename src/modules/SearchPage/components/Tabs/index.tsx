import { useAppDispatch, useAppSelector } from 'app/hooks';
import { activeTabSync } from 'features/tabs/tabsSlice';
import { AvailableTabs, TABS } from 'appConstants';
import { useResources } from 'hooks';
import * as S from './styled';

export const Tabs = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const { isLoading, totalPokemonResults, totalMoveResults, totalTypeResults } = useResources();
  return (
    <S.TabsWrapper>
      {TABS.map((option) => (
        <S.Tab
          active={option === activeTab}
          key={option}
          onClick={() => dispatch(activeTabSync(option))}
        >
          {option}{' '}
          {!isLoading &&
            `(${
              option === AvailableTabs.pokemons
                ? totalPokemonResults
                : option === AvailableTabs.moves
                ? totalMoveResults
                : option === AvailableTabs.types
                ? totalTypeResults
                : 0
            })`}
        </S.Tab>
      ))}
    </S.TabsWrapper>
  );
};
