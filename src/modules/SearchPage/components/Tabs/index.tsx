import { AvailableTabs, TABS } from 'appConstants';
import { useGlobalContext } from 'contexts';
import * as S from './styled';

type Props = {
  onClick: (tab: AvailableTabs) => void;
  activeTab: AvailableTabs;
  options: typeof TABS;
  isLoading: boolean;
};

export const Tabs = ({ activeTab, isLoading, options, onClick }: Props) => {
  const { lengths } = useGlobalContext();
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
