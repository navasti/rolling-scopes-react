import styled from 'styled-components';

type Props = {
  active: boolean;
};

export const Option = styled.div<Props>`
  text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
`;
