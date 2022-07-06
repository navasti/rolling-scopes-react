import styled from 'styled-components';

export const SearchBar = styled.div`
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;
  display: flex;
  width: 260px;
`;

export const InputWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    fill: purple;
    top: 0.6rem;
    left: 1rem;
  }
`;

export const Label = styled.label`
  margin-bottom: 0.4rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Input = styled.input`
  border: 2px solid purple;
  padding: 0.8rem 1.6rem 0.8rem 3.6rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: green;
`;
