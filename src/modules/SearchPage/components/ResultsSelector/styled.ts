import styled from 'styled-components';

export const SelectorWrapper = styled.div`
  align-items: center;
  margin-left: 15px;
  display: flex;
`;

export const Option = styled.span<{ active?: boolean }>`
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  font-weight: ${({ active }) => (active ? '600' : '500')};
  font-size: 1.125rem;
  border-radius: 5px;
  padding: 2px 4px;
  cursor: pointer;
  &:hover {
    background-color: #bbb;
  }
`;

export const Label = styled.span`
  font-size: 1.125rem;
`;
