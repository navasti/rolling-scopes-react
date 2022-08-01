import { FieldReturnType } from 'types';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import { capitalize } from 'utils';
import * as S from './styled';

type Props = FieldReturnType<Fields.gender>;

export const GenderField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { value, name, onChange } = props;
  return (
    <S.RadioField>
      <input onChange={onChange} value={value} type="radio" name={name} ref={ref} />
      {capitalize(value || '')}
    </S.RadioField>
  );
});
