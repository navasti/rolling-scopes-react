import { useSearchContext } from 'contexts';
import { AvailableTabs, TABS } from 'appConstants';
import * as S from './styled';

export const Tabs = () => {
  const {
    searchState: { isLoading, lengths, activeTab },
    setActiveTab,
    setPage,
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
