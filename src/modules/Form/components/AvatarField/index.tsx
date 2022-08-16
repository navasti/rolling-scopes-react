import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

export const AvatarField = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <S.FileField htmlFor={Fields.avatar}>
      Avatar
      <input id={Fields.avatar} ref={ref} type="file" />
    </S.FileField>
  );
});
