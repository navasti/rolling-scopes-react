import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import { CheckFields } from 'types';
import { capitalize } from 'utils';
import * as S from './styled';

type Props = {
  onChange: (field: CheckFields) => void;
  name: string;
};

export const GenderField = forwardRef<HTMLInputElement, Props>(({ name, onChange }, ref) => {
  return (
    <S.RadioField htmlFor={name}>
      <input
        onChange={() => onChange(Fields.gender)}
        name={Fields.gender}
        value={name}
        type="radio"
        ref={ref}
        id={name}
      />
      {capitalize(name)}
    </S.RadioField>
  );
});
