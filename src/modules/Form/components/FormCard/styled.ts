import styled from 'styled-components';

export const Card = styled.div`
  border: 2px solid #aaa;
  border-radius: 10px;
  font-size: 0.875rem;
  margin-bottom: 5px;
  align-items: center;
  display: flex;
  padding: 5px;
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
    text-transform: uppercase;
    span {
      font-weight: 500;
      text-transform: capitalize;
    }
  }
`;
