import { LocationBadge } from 'modules/Header/components';
import { Link } from 'react-router-dom';
import * as S from './styled';

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
          <Link role="link" to="/form">
            Form
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
