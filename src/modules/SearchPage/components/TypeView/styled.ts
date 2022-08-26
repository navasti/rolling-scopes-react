import styled from 'styled-components';

export { Card } from 'modules/SearchPage/styled';

export const CardsWrapper = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  display: grid;
  width: 100%;
  gap: 10px;
`;

export const TypeView = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
`;
