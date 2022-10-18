import { activeTabSync } from 'features/userSettings/userSettingsSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AvailableTabs, TABS } from 'appConstants';
import { useResources } from 'hooks';
import * as S from './styled';

export const Tabs = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.userSettings.activeTab);
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
