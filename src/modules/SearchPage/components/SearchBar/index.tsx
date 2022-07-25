import * as S from './styled';
import { SearchIcon } from 'assets/images/svg';
import React, { ChangeEvent } from 'react';

type Props = {
  label: string;
  inputValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = (props: Props) => {
  const { inputValue, label, onChange } = props;
  return (
    <S.SearchBar>
      <S.Label htmlFor="storage-input">{label}</S.Label>
      <S.InputWrapper>
        <SearchIcon />
        <S.Input
          placeholder="Type here"
          onChange={onChange}
          value={inputValue}
          id="storage-input"
          type="text"
        />
      </S.InputWrapper>
    </S.SearchBar>
  );
};
