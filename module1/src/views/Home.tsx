import { INPUT_VALUE_KEY } from '../constants';
import React, { ChangeEvent } from 'react';
import { SearchBar } from 'components';
import * as Styled from './styled';

interface State {
  inputValue: string;
}

export class Home extends React.Component<unknown, State> {
  state: State = {
    inputValue: '',
  };
  componentDidMount() {
    const value = window.localStorage.getItem(INPUT_VALUE_KEY);
    if (value != null) {
      this.setState({ inputValue: value });
    }
  }
  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ inputValue: value });
    window.localStorage.setItem(INPUT_VALUE_KEY, value);
  };
  render() {
    return (
      <Styled.CenteredContainer>
        <SearchBar
          onChange={this.onChange}
          label="Local Storage Input"
          inputValue={this.state.inputValue}
        />
      </Styled.CenteredContainer>
    );
  }
}
