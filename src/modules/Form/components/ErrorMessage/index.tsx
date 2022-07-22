import React, { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  message: string;
  visible: boolean;
  center?: boolean;
};

export const ErrorMessage = forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const { message, center, visible } = props;
  return (
    <S.ErrorMessage visible={visible} ref={ref} center={center}>
      {message}
    </S.ErrorMessage>
  );
});
