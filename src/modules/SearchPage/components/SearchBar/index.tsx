import { SEARCH_BAR_INSTRUCTIONS } from 'appConstants';
import { ChangeEvent, KeyboardEvent } from 'react';
import { SearchIcon } from 'assets/images/svg';
import * as S from './styled';

type Props = {
  label: string;
  inputValue: string;
  inputDisabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ inputValue, label, inputDisabled, onChange, onKeyDown }: Props) => {
  return (
    <>
      <S.SearchBar>
        <S.Label htmlFor="storage-input">{label}</S.Label>
        <S.InputWrapper>
          <SearchIcon data-testid="search-icon" />
          <S.Input
            placeholder="Type here"
            disabled={inputDisabled}
            onKeyDown={onKeyDown}
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
