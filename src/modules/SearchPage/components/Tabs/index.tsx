import { AvailableTabs, TABS } from 'appConstants';
import { useGlobalContext } from 'contexts';
import { useGlobalData } from 'hooks';
import * as S from './styled';

export const Tabs = () => {
  const {
    setAllData,
    state: { isLoading, activeTab },
  } = useGlobalContext();

  const { totalResults } = useGlobalData();

  const onClick = (option: AvailableTabs) => setAllData({ activeTab: option });

  return (
    <S.TabsWrapper>
      {TABS.map((option) => (
        <S.Tab active={option === activeTab} key={option} onClick={() => onClick(option)}>
          {option}{' '}
          {!isLoading &&
            `(${
              option === AvailableTabs.pokemons
                ? totalResults.pokemons
                : option === AvailableTabs.moves
                ? totalResults.moves
                : option === AvailableTabs.types
                ? totalResults.types
                : 0
            })`}
        </S.Tab>
      ))}
    </S.TabsWrapper>
  );
};
