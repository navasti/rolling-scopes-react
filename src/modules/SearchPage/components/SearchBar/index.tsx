import { ChangeEvent, KeyboardEvent } from 'react';
import { SearchIcon } from 'assets/images/svg';
import * as S from './styled';

type Props = {
  label: string;
  isLoading: boolean;
  inputValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const SearchBar = (props: Props) => {
  const { inputValue, label, isLoading, onChange, onKeyDown } = props;
  return (
    <>
      <S.SearchBar>
        <S.Label htmlFor="storage-input">{label}</S.Label>
        <S.InputWrapper>
          <SearchIcon />
          <S.Input
            placeholder="Type here"
            onKeyDown={onKeyDown}
            disabled={isLoading}
            onChange={onChange}
            value={inputValue}
            id="storage-input"
            type="text"
          />
        </S.InputWrapper>
      </S.SearchBar>
      <b>Type and press enter to search for specific pokemon, type or move.</b>
      <b style={{ marginBottom: '30px' }}>
        Clear input and press enter to search for all pokemons, types and moves.
      </b>
    </>
  );
};
