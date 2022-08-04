import styled from 'styled-components';

export const SearchBar = styled.div`
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  display: flex;
  width: 260px;
`;

export const InputWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    fill: purple;
    top: 8px;
    left: 10px;
  }
`;

export const Label = styled.label`
  margin-bottom: 4px;
  font-size: 1.3rem;
  font-weight: bold;
`;

export const Input = styled.input`
  border: 2px solid purple;
  padding: 8px 16px 8px 38px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: green;
`;

export const InputInstructions = styled.div`
  text-align: center;
  margin: 10px 0 20px 0;
`;

export const InputInstruction = styled.span`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
`;
