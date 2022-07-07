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
      <S.SearchBar>
        <S.Label>{label}</S.Label>
        <S.InputWrapper>
          <SearchIcon />
          <S.Input onChange={onChange} value={inputValue} type="text" />
        </S.InputWrapper>
      </S.SearchBar>
    );
  }
}
