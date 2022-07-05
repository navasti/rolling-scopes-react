import * as Styled from './styled';
import { SearchIcon } from './components';
import React, { ChangeEvent } from 'react';

interface Props {
  label: string;
  inputValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export class SearchBar extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { inputValue, label, onChange } = this.props;
    return (
      <Styled.SearchBar>
        <Styled.Label>{label}</Styled.Label>
        <Styled.InputWrapper>
          <SearchIcon />
          <Styled.Input onChange={(event) => onChange(event)} value={inputValue} type="text" />
        </Styled.InputWrapper>
      </Styled.SearchBar>
    );
  }
}
