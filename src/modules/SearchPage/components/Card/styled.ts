import styled from 'styled-components';

export const Card = styled.div`
  border: 2px solid #aaa;
  flex-direction: column;
  border-radius: 10px;
  font-size: 0.775rem;
  padding: 5px;
  display: flex;
`;

export const ImageWrapper = styled.div`
  display: flex;
`;

export const Image = styled.img`
  border-right: 1px solid #aaa;
  align-self: center;
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

export const Stats = styled.div`
  margin-top: 5px;
`;

export const Abilities = styled.div`
  margin-top: 5px;
`;
