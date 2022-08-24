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
