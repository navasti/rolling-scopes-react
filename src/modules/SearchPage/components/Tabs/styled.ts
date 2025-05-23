import styled from 'styled-components';

type Props = {
  active: boolean;
};

export const TabsWrapper = styled.div`
  background-color: #3c1361;
  justify-content: center;
  align-self: center;
  border-radius: 10px;
  align-items: center;
  display: flex;
`;

export const Tab = styled.span<Props>`
  color: ${({ active }) => (active ? '#ffc83d' : '#ddd')};
  border-radius: 10px;
  font-size: 1.15rem;
  padding: 6px 10px;
  cursor: pointer;
  &:hover {
    background-color: #52307c;
  }
`;
