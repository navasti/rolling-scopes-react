import * as S from './styled';
import { SearchIcon } from 'assets/images';
import React, { ChangeEvent } from 'react';

type Props = {
  label: string;
  inputValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export class SearchBar extends React.Component<Props, unknown> {
  render() {
    const { inputValue, label, onChange } = this.props;
    return (
      <S.SearchBar title="search-bar">
        <S.Label title="local-storage-label">{label}</S.Label>
        <S.InputWrapper>
          <SearchIcon />
          <S.Input onChange={onChange} title="local-storage-input" value={inputValue} type="text" />
        </S.InputWrapper>
      </S.SearchBar>
    );
  }
}
