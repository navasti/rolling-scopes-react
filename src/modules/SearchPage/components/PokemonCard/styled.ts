import styled from 'styled-components';

export const Card = styled.button`
  border: 2px solid #aaa;
  background-color: #fff;
  flex-direction: column;
  border-radius: 10px;
  font-size: 0.775rem;
  cursor: pointer;
  text-align: left;
  display: flex;
  padding: 5px;
  &:hover {
    border-color: #000;
    img {
      border-color: #000;
    }
  }
`;

export const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const Image = styled.img`
  border-right: 1px solid #aaa;
`;

export const Title = styled.span`
  display: inline-block;
  font-size: 0.875rem;
  margin-bottom: 2px;
  font-weight: 600;
`;

export const BaseInformation = styled.div`
  margin-left: 10px;
`;
