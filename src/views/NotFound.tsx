import * as Styled from './styled';
import React from 'react';

export class NotFound extends React.Component {
  render() {
    return (
      <Styled.CommonViewLayout>
        <Styled.CommonMessage>404. Unfortunately page was not found</Styled.CommonMessage>
      </Styled.CommonViewLayout>
    );
  }
}
