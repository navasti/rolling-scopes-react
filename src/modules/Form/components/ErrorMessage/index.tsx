import * as S from './styled';

type Props = {
  message: string | null;
  visible: boolean;
  center?: boolean;
};

export const ErrorMessage = ({ message, center, visible }: Props) => {
  return (
    <S.ErrorMessage visible={visible} center={center}>
      {message}
    </S.ErrorMessage>
  );
};
