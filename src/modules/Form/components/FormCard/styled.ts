import styled from 'styled-components';

export const Card = styled.div`
  border: 2px solid #aaa;
  border-radius: 10px;
  font-size: 0.875rem;
  padding: 5px;
  display: flex;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  img {
    max-height: 100px;
    border-radius: 10px;
  }
`;

export const Details = styled.div`
  flex-direction: column;
  margin-left: 10px;
  display: flex;
  p {
    font-weight: 600;
    span {
      font-weight: 500;
    }
  }
`;
