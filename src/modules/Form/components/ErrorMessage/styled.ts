import styled from 'styled-components';

type Props = {
  visible: boolean;
};

export const ErrorMessage = styled.span<Props>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  text-align: center;
  margin-bottom: 5px;
  color: red;
`;
