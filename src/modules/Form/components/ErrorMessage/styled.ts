import styled from 'styled-components';

type Props = {
  visible: boolean;
  center?: boolean;
};

export const ErrorMessage = styled.span<Props>`
  text-align: ${(props) => (props?.center ? 'center' : 'left')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.2s ease-in-out;
  margin-bottom: 10px;
  font-size: 0.875rem;
  min-height: 16px;
  color: red;
`;
