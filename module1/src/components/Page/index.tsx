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
    console.log(props);
  }
  render() {
    return (
      <Styled.PageWrapper>
        <Header componentName={this.props.componentName} location={this.props.location} />
        <div>{this.props.children}</div>
      </Styled.PageWrapper>
    );
  }
}
