import styled from 'styled-components';

export const Card = styled.div`
  border: 2px solid #aaa;
  flex-direction: column;
  border-radius: 10px;
  font-size: 0.875rem;
  padding: 5px;
  display: flex;
`;

export const ImageWrapper = styled.div`
  display: flex;
`;

export const Paragraph = styled.p``;

export const Image = styled.img`
  border-bottom-right-radius: 10px;
  border-bottom: 1px solid #aaa;
  border-right: 1px solid #aaa;
  align-self: center;
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

export const BaseInformation = styled.div`
  margin-left: 10px;
`;

export const Stats = styled.div`
  margin-top: 5px;
`;

export const Abilities = styled.div`
  margin-top: 5px;
`;
