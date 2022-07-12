import styled from 'styled-components';

export const ErrorMessage = styled.span`
  text-align: center;
  display: none;
  color: red;
`;

export const CommonLabel = styled.label`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 5px 0;
  select {
    border: 1px solid #999;
    border-radius: 5px;
    padding: 5px;
  }
`;
