import styled from 'styled-components';

export const CardsWrapper = styled.div<{ isLoading: boolean; min: string }>`
  align-self: ${({ isLoading }) => (isLoading ? 'center' : 'flex-start')};
  grid-template-columns: repeat(auto-fill, minmax(${({ min }) => min}, 1fr));
  display: grid;
  width: 100%;
  gap: 10px;
`;

export const MovePropertiesWrapper = styled.div`
  flex-direction: column;
  display: flex;
`;

export const NoDataInfo = styled.p`
  transform: translateX(-50%);
  position: absolute;
  left: 50%;
`;
