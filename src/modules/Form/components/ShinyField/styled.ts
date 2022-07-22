import styled from 'styled-components';

export const SwitchWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 15px 0 5px 0;
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
