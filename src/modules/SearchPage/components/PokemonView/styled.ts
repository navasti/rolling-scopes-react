import styled from 'styled-components';

export { Card, CardsWrapper, TextCenter, SelectorsWrapper } from 'modules/SearchPage/styled';

export const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const Image = styled.img`
  border-right: 1px solid #aaa;
  padding-right: 5px;
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

export const PokemonView = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
`;
