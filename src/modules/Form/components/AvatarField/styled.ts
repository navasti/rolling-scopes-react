import styled from 'styled-components';

export const FileField = styled.label`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 5px 0;
  input {
    width: 295px;
    border: none;
    border-radius: 0;
  }
`;

export const ErrorMessage = styled.span`
  text-align: center;
  margin-top: 2px;
  margin-bottom: 5px;
  display: none;
  color: red;
`;
