import { AvailableTabs, Lengths, tabs } from 'appConstants';
import * as S from './styled';

type Props = {
  onClick: (tab: AvailableTabs) => void;
  activeTab: AvailableTabs;
  options: typeof tabs;
  isLoading: boolean;
  lengths: Lengths;
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
