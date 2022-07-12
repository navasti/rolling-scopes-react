import styled from 'styled-components';

export const RadioWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 5px 0;
`;

export const RadioField = styled.label`
  margin: 0 6px;
  input {
    margin-right: 3px;
  }
`;

export const ErrorMessage = styled.span`
  text-align: center;
  margin-bottom: 5px;
  display: none;
  color: red;
`;
