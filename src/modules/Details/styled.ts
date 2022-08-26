import styled from 'styled-components';

export const DetailsView = styled.div`
  flex-direction: column;
  max-width: 500px;
  margin: 30px auto 15px auto;
  display: flex;
`;

export const DetailsInformation = styled.p`
  font-size: 1.25rem;
`;

export const MessageWrapper = styled.div`
  flex-direction: column;
  display: flex;
`;

export const ReturnButton = styled.button`
  background-color: #222;
  border: 2px solid #222;
  border-radius: 5px;
  align-self: center;
  cursor: pointer;
  margin: 15px 5px 15px 5px;
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
