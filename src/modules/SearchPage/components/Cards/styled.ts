import styled from 'styled-components';

export const CardsWrapper = styled.div<{ isLoading: boolean; min: string; center?: boolean }>`
  grid-template-columns: repeat(auto-fill, minmax(${({ min }) => min}, 1fr));
  align-self: ${({ isLoading }) => (isLoading ? 'center' : 'flex-start')};
  justify-items: ${({ center }) => (center ? 'center' : 'stretch')};
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
