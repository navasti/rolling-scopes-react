import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

export const ShinyField = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <S.SwitchWrapper>
      Shiny
      <S.SwitchField htmlFor={Fields.shiny}>
        <input id={Fields.shiny} name={Fields.shiny} ref={ref} type="checkbox" />
        <span></span>
      </S.SwitchField>
    </S.SwitchWrapper>
  );
});
