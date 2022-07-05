import * as Styled from './styled';
import React, { ChangeEvent } from 'react';

interface Props {
  inputValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export class SearchBar extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { inputValue, onChange } = this.props;
    return (
      <Styled.InputWrapper>
        <Styled.Label>Label</Styled.Label>
        <Styled.Input onChange={(event) => onChange(event)} value={inputValue} type="text" />
      </Styled.InputWrapper>
    );
  }
}
