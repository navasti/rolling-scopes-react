import { AvailableTabs, Lengths, tabs } from 'appConstants';
import * as S from './styled';
type Props = {
  lengths: Lengths;
  isLoading: boolean;
  options: typeof tabs;
  activeTab: AvailableTabs;
  onClick: (tab: AvailableTabs) => void;
};

export const Tabs = ({ activeTab, lengths, isLoading, options, onClick }: Props) => {
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
