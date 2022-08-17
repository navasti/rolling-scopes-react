import { AvailableTabs, TABS } from 'appConstants';
import { Lengths } from 'types';
import * as S from './styled';

type Props = {
  onClick: (tab: AvailableTabs) => void;
  activeTab: AvailableTabs;
  options: typeof TABS;
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
