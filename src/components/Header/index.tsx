import { LocationBadge } from './components';
import { Link } from 'react-router-dom';
import * as Styled from './styled';
import React from 'react';

interface Props {
  componentName: string;
  location: string;
}

export class Header extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <Styled.Header>
        <Styled.Nav>
          <Styled.LinkWrapper>
            <Link to="/">Home</Link>
          </Styled.LinkWrapper>
          <Styled.LinkWrapper>
            <Link to="/about">About</Link>
          </Styled.LinkWrapper>
          <Styled.LinkWrapper>
            <Link to="/invalid">Invalid</Link>
          </Styled.LinkWrapper>
        </Styled.Nav>
        <LocationBadge componentName={this.props.componentName} location={this.props.location} />
      </Styled.Header>
    );
  }
}
