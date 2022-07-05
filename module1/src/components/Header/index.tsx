import React from 'react';
import * as Styled from './styled';
import { Link } from 'react-router-dom';
import { LocationBadge } from 'components';

interface Props {
  componentName: string;
  location: string;
}

export class Header extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);
    console.log(props);
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
