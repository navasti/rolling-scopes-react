import { AvailableTabs, TABS } from 'appConstants';
import { useSearchContext } from 'contexts';
import * as S from './styled';

export const Tabs = () => {
  const {
    setPage,
    setActiveTab,
    searchState: { isLoading, lengths, activeTab },
  } = useSearchContext();

  const onClick = (option: AvailableTabs) => {
    setActiveTab(option);
    setPage(1);
  };

  return (
    <S.TabsWrapper>
      {TABS.map((option) => (
        <S.Tab active={option === activeTab} key={option} onClick={() => onClick(option)}>
          {option} {!isLoading && `(${lengths[option]})`}
        </S.Tab>
      ))}
    </S.TabsWrapper>
  );
};
