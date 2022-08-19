import { AvailableTabs, TABS } from 'appConstants';
import { useSearchContext } from 'contexts';
import * as S from './styled';

type Props = {
  onClick: (tab: AvailableTabs) => void;
  activeTab: AvailableTabs;
  options: typeof TABS;
};

export const Tabs = ({ activeTab, options, onClick }: Props) => {
  const {
    searchState: { isLoading, lengths },
  } = useSearchContext();
  return (
    <S.TabsWrapper>
      {options.map((option) => (
        <S.Tab active={option === activeTab} key={option} onClick={() => onClick(option)}>
          {option} {!isLoading && `(${lengths[option]})`}
        </S.Tab>
      ))}
    </S.TabsWrapper>
  );
};
