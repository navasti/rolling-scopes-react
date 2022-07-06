import { Header } from 'components/Header';
import * as Styled from './styled';
import React from 'react';

interface Props {
  children: JSX.Element;
  componentName: string;
  location: string;
}

export class Page extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <Styled.PageWrapper>
        <Header componentName={this.props.componentName} location={this.props.location} />
        <Styled.Main>{this.props.children}</Styled.Main>
      </Styled.PageWrapper>
    );
  }
}
