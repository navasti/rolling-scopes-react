import styled from 'styled-components';
import { MessageType } from 'types';

type Props = {
  type: MessageType;
  visible: boolean;
  center?: boolean;
};

export const Message = styled.span<Props>`
  margin-top: ${(props) => (props.type === MessageType.success ? '10px' : '0')};
  color: ${(props) => (props.type === MessageType.error ? 'red' : 'green')};
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.2s ease-in-out;
  margin-bottom: 10px;
  font-size: 0.875rem;
  min-height: 16px;
`;
