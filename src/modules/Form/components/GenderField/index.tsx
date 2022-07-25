import { CHECK_FIELDS, FIELDS } from 'appConstants';
import { forwardRef } from 'react';
import { capitalize } from 'utils';
import * as S from './styled';

type Props = {
  onChange: (field: CHECK_FIELDS) => void;
  name: string;
};

export const GenderField = forwardRef<HTMLInputElement, Props>(({ name, onChange }, ref) => {
  return (
    <S.RadioField htmlFor={name}>
      <input
        onChange={() => onChange(FIELDS.gender)}
        name={FIELDS.gender}
        value={name}
        type="radio"
        ref={ref}
        id={name}
      />
      {capitalize(name)}
    </S.RadioField>
  );
});
