import styled from 'styled-components';

export const Card = styled.button`
  border: 2px solid #aaa;
  background-color: #fff;
  flex-direction: column;
  border-radius: 10px;
  font-size: 0.875rem;
  text-align: center;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  width: 130px;
  &:hover {
    border-color: #000;
  }
`;

export const MovePropertiesWrapper = styled.div`
  flex-direction: column;
  display: flex;
`;

export const ModalTitle = styled.span`
  text-transform: uppercase;
  display: inline-block;
  font-weight: 600;
  font-size: 1rem;
`;
