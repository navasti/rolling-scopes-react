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

export const CommonDiv = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 5px 0;
`;

export const CommonLabel = styled.label`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 5px 0;
  input,
  select {
    border: 1px solid #999;
    border-radius: 5px;
    padding: 5px;
  }
`;

export const SwitchWrapper = styled(CommonDiv)``;

export const RadioWrapper = styled(CommonDiv)``;

export const FileField = styled(CommonLabel)`
  input {
    width: 295px;
    border: none;
    border-radius: 0;
  }
`;

export const RadioField = styled.label`
  margin: 0 6px;
  input {
    margin-right: 3px;
  }
`;

export const SubmitButton = styled.button`
  transition: 0.2s ease;
  border: 2px solid #353535;
  background-color: #353535;
  border-radius: 10px;
  align-self: center;
  padding: 5px 10px;
  cursor: pointer;
  width: 200px;
  color: #eee;
  &:hover {
    background-color: #eee;
    color: #353535;
  }
`;

export const CheckboxField = styled.label`
  text-align: center;
  margin: 15px 0;
`;

export const SwitchField = styled.label`
  display: inline-block;
  position: relative;
  height: 34px;
  width: 60px;
  input {
    width: 0;
    height: 0;
    opacity: 0;
    &:checked + span {
      background-color: #2196f3;
    }
    &:focus + span {
      box-shadow: 0 0 1px #2196f3;
    }
    &:checked + span:before {
      transform: translateX(26px);
    }
  }
  span {
    background-color: #ccc;
    border-radius: 34px;
    position: absolute;
    transition: 0.4s;
    cursor: pointer;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    &:before {
      background-color: white;
      border-radius: 50%;
      position: absolute;
      transition: 0.4s;
      height: 26px;
      bottom: 4px;
      content: '';
      width: 26px;
      left: 4px;
    }
  }
`;
