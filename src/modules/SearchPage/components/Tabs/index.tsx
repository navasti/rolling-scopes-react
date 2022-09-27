import { AvailableTabs, TABS } from 'appConstants';
import { useAppContext } from 'contexts';
import { useGlobalData } from 'hooks';
import { PayloadTypes } from 'types';
import * as S from './styled';

export const Tabs = () => {
  const onClick = (option: AvailableTabs) =>
    dispatch({ type: PayloadTypes.activeTab, payload: option });
  const { totalResults } = useGlobalData();

  const {
    dispatch,
    state: { isLoading, activeTab },
  } = useAppContext();

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
