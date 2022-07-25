import { FIELDS } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

export const ShinyField = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <S.SwitchWrapper>
      Shiny
      <S.SwitchField htmlFor={FIELDS.shiny}>
        <input id={FIELDS.shiny} name={FIELDS.shiny} ref={ref} type="checkbox" />
        <span></span>
      </S.SwitchField>
    </S.SwitchWrapper>
  );
});
