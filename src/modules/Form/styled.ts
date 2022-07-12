import styled from 'styled-components';

export const CommonView = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
  hr {
    width: 200px;
    margin: 15px 0 25px 0;
  }
`;

export const FormHeading = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 25px 0;
`;

export const Form = styled.form`
  flex-direction: column;
  font-size: 1.2rem;
  min-width: 470px;
  display: flex;
`;

export const SubmitButton = styled.button`
  transition: 0.2s ease;
  border: 2px solid #353535;
  background-color: #353535;
  border-radius: 10px;
  align-self: center;
  padding: 5px 10px;
  margin-top: 20px;
  cursor: pointer;
  width: 200px;
  color: #eee;
  &:hover {
    background-color: #eee;
    color: #353535;
  }
`;
