import styled from 'styled-components';

export const SearchPageView = styled.div`
  flex-direction: column;
  padding: 0 10px 0 10px;
  margin-bottom: 10px;
  align-items: center;
  display: flex;
`;

export const SelectorsWrapper = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  margin-top: 15px;
`;

export const TextCenter = styled.p`
  text-align: center;
`;

export const CardsWrapper = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  transition: opacity 0.3s ease-in;
  display: grid;
  width: 100%;
  gap: 10px;
`;

export const SmallerCardsWrapper = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  transition: opacity 0.3s ease-in;
  display: grid;
  width: 100%;
  gap: 10px;
`;

export const CommonMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 1.4rem;
`;

export const Card = styled.div<{ stretch?: boolean; align: 'left' | 'center' }>`
  width: ${({ stretch }) => (stretch ? '' : '130px')};
  text-align: ${({ align }) => align};
  justify-content: center;
  border: 2px solid #aaa;
  background-color: #fff;
  flex-direction: column;
  border-radius: 10px;
  font-size: 0.875rem;
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  &:hover {
    border-color: #000;
    img {
      border-color: #000;
    }
  }
`;
