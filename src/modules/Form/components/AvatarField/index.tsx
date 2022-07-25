import { FIELDS } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

export const AvatarField = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <S.FileField htmlFor={FIELDS.avatar}>
      Avatar
      <input id={FIELDS.avatar} ref={ref} type="file" />
    </S.FileField>
  );
});
