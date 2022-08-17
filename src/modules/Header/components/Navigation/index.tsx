import { Link } from 'react-router-dom';
import { LINKS } from 'appConstants';
import { capitalize } from 'utils';
import * as S from './styled';

export const Navigation = () => (
  <S.Nav>
    <S.LinkWrapper>
      {LINKS.map((link) => (
        <Link key={link} to={link === 'home' ? '/' : `/${link}`}>
          {capitalize(link)}
        </Link>
      ))}
    </S.LinkWrapper>
  </S.Nav>
);
