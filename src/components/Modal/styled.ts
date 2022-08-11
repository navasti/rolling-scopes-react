import styled from 'styled-components';

export const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  position: fixed;
  display: flex;
  height: 100vh;
  z-index: 999;
  width: 100%;
  left: 0;
  top: 0;
`;

export const ModalWindow = styled.div`
  background-color: #eee;
  border: 2px solid #222;
  border-radius: 10px;
  overflow-y: auto;
  max-height: 80%;
  padding: 20px;
  width: 480px;
`;

export const Header = styled.header`
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

export const CloseButton = styled.button`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  border: none;
  padding: 5px;
  &:hover svg {
    transform: rotate(90deg);
  }
  svg {
    transform: rotate(0deg);
    transition: transform 0.1s linear;
    width: 20px;
  }
`;

export const Content = styled.div`
  margin: 15px 0;
`;
