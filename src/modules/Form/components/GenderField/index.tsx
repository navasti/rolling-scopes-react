import React, { forwardRef } from 'react';
import { FIELDS } from 'appConstants';
import { capitalize } from 'utils';
import * as S from './styled';

type Props = {
  onChange: (field: string) => void;
  name: string;
};

export const GenderField = forwardRef<HTMLInputElement, Props>(({ name, onChange }, ref) => {
  return (
    <S.RadioField htmlFor={name}>
      <input
        onChange={() => onChange(FIELDS.GENDER)}
        name={FIELDS.GENDER}
        value={name}
        type="radio"
        ref={ref}
        id={name}
      />
      {capitalize(name)}
    </S.RadioField>
  );
});
