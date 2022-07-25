import styled from 'styled-components';

export const Cards = styled.div``;

export const CardsWrapper = styled.div<{ isLoading: boolean }>`
  align-self: ${({ isLoading }) => (isLoading ? 'center' : 'flex-start')};
  grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
  display: grid;
  width: 100%;
  gap: 10px;
`;
