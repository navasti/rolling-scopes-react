import { LocationBadge } from './components';
import { Link } from 'react-router-dom';
import * as S from './styled';
import React from 'react';

type Props = {
  componentName: string;
  location: string;
};

export const Header = ({ componentName, location }: Props) => {
  return (
    <S.Header>
      <S.Nav role="navigation">
        <S.LinkWrapper>
          <Link role="link" to="/">
            Home
          </Link>
        </S.LinkWrapper>
        <S.LinkWrapper>
          <Link role="link" to="/about">
            About
          </Link>
        </S.LinkWrapper>
        <S.LinkWrapper>
          <Link role="link" to="/forms">
            Forms
          </Link>
        </S.LinkWrapper>
        <S.LinkWrapper>
          <Link role="link" to="/invalid">
            Invalid
          </Link>
        </S.LinkWrapper>
      </S.Nav>
      <LocationBadge componentName={componentName} location={location} />
    </S.Header>
  );
};
