import styled from 'styled-components';

interface Props {
  isLoading: boolean;
}

export const CardsWrapper = styled.div<Props>`
  align-self: ${(p) => (p.isLoading ? 'center' : 'flex-start')};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  display: grid;
  width: 100%;
  gap: 1rem;
`;
