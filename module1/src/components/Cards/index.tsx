import React from 'react';
import * as Styled from './styled';
import { Card } from './components';

// interface Props {}
// interface State {}

export class Cards extends React.Component<unknown, unknown> {
  constructor(props: unknown) {
    super(props);
  }
  render() {
    return (
      <Styled.CardsWrapper>
        <Card />
      </Styled.CardsWrapper>
    );
  }
}
