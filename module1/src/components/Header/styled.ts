import styled from 'styled-components';

export const Header = styled.header`
  justify-content: space-between;
  display: flex;
`;

export const Nav = styled.nav`
  align-items: center;
  display: flex;
`;

export const LinkWrapper = styled.div`
  a {
    color: #000;
    padding: 1rem;
    font-size: 1.8rem;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
