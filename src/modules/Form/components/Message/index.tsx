import { MessageType } from 'types';
import { capitalize } from 'utils';
import * as S from './styled';

type Props = {
  message: string | null;
  type: MessageType;
  visible: boolean;
  center?: boolean;
};

export const Message = ({ message, center, visible, type }: Props) => {
  return (
    <S.Message visible={visible} center={center} type={type}>
      {message && capitalize(message)}
    </S.Message>
  );
};
