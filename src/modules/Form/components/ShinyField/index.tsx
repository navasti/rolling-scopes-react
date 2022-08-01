import { FieldReturnType } from 'types';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = FieldReturnType<Fields.shiny>;

export const ShinyField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, onChange } = props;
  return (
    <S.SwitchWrapper>
      Shiny
      <S.SwitchField>
        <input name={name} ref={ref} type="checkbox" onChange={onChange} />
        <span></span>
      </S.SwitchField>
    </S.SwitchWrapper>
  );
});
