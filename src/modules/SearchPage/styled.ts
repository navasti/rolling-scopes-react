import styled from 'styled-components';

export const SearchPageView = styled.div`
  flex-direction: column;
  padding: 0 10px 0 10px;
  margin-bottom: 10px;
  align-items: center;
  display: flex;
`;

export const CommonMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 1.4rem;
`;

export const CardsWrapper = styled.div<{ isLoading: boolean }>`
  align-self: ${({ isLoading }) => (isLoading ? 'center' : 'flex-start')};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  display: grid;
  width: 100%;
  gap: 10px;
`;
