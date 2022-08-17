import { ChangeEvent, KeyboardEvent } from 'react';
import { SearchIcon } from 'assets/images/svg';
import * as S from './styled';
import { SEARCH_BAR_INSTRUCTIONS } from 'appConstants';

type Props = {
  label: string;
  isLoading: boolean;
  inputValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ inputValue, label, isLoading, onChange, onKeyDown }: Props) => {
  return (
    <>
      <S.SearchBar>
        <S.Label htmlFor="storage-input">{label}</S.Label>
        <S.InputWrapper>
          <SearchIcon data-testid="search-icon" />
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
      <S.InputInstructions>
        {SEARCH_BAR_INSTRUCTIONS.map((instruction) => (
          <S.InputInstruction key={instruction}>{instruction}</S.InputInstruction>
        ))}
      </S.InputInstructions>
    </>
  );
};
