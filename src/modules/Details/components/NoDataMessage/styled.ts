import styled from 'styled-components';

export const Title = styled.p`
  font-size: 1.25rem;
`;

export const ReturnButton = styled.button`
  background-color: #222;
  border: 2px solid #222;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    background-color: #444;
    border: 2px solid #444;
  }
  a {
    text-decoration: none;
    display: inline-block;
    padding: 5px 10px;
    color: #ddd;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

export const FetchButton = styled.button`
  background-color: #ddd;
  border: 2px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 5px;
  transition: border 0.2s linear;
  &:hover {
    border: 2px solid #222;
  }
`;

export const MessageWrapper = styled.div`
  flex-direction: column;
  display: flex;
`;
