import { FieldReturnType } from 'types';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import { capitalize } from 'utils';
import * as S from './styled';

type Props = FieldReturnType<Fields.gender>;

export const GenderField = forwardRef<HTMLInputElement, Props>(({ value, name, onChange }, ref) => {
  return (
    <S.RadioField htmlFor={name}>
      <input onChange={onChange} id={name} value={value} type="radio" name={name} ref={ref} />
      {capitalize(value || '')}
    </S.RadioField>
  );
});
