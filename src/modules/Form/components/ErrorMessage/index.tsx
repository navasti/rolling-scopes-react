import React, { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  message: string;
  visible: boolean;
};

export const ErrorMessage = forwardRef<HTMLSpanElement, Props>(({ message, visible }, ref) => {
  return (
    <S.ErrorMessage visible={visible} ref={ref}>
      {message}
    </S.ErrorMessage>
  );
});
