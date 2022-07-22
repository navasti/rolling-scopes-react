import React, { forwardRef } from 'react';
import { FIELDS } from 'appConstants';
import * as S from './styled';

export const AvatarField = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <S.FileField htmlFor={FIELDS.AVATAR}>
      Avatar
      <input id={FIELDS.AVATAR} ref={ref} type="file" />
    </S.FileField>
  );
});
