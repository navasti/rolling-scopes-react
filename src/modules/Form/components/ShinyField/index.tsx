import React, { forwardRef } from 'react';
import { FIELDS } from 'appConstants';
import * as S from './styled';

export const ShinyField = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <S.SwitchWrapper>
      Shiny
      <S.SwitchField htmlFor={FIELDS.SHINY}>
        <input id={FIELDS.SHINY} name={FIELDS.SHINY} ref={ref} type="checkbox" />
        <span></span>
      </S.SwitchField>
    </S.SwitchWrapper>
  );
});
