import styled from 'styled-components';

type PaginationButtonProps = {
  active?: boolean;
};

export const Pagination = styled.div`
  align-self: center;
  margin: 15px 0;
`;

export const PaginationButton = styled.button<PaginationButtonProps>`
  background-color: ${(props) => (props?.active ? '#ffc83d' : '#fff')};
  transition: all 0.3s;
  border-radius: 5px;
  padding: 4px 6px;
  cursor: pointer;
  margin: 0 2px;
`;
