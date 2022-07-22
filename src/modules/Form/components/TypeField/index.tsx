import { POKEMON_TYPES } from 'appConstants';
import React, { forwardRef } from 'react';
import { FIELDS } from 'appConstants';
import * as S from './styled';

type Props = {
  onChange: (field: string) => void;
  children: JSX.Element;
};

export const TypeField = forwardRef<HTMLSelectElement, Props>(({ children, onChange }, ref) => {
  return (
    <>
      <S.CommonLabel htmlFor={FIELDS.TYPE}>
        *Main type
        <select
          onChange={() => onChange(FIELDS.TYPE)}
          name={FIELDS.TYPE}
          id={FIELDS.TYPE}
          ref={ref}
        >
          <option value=""></option>
          {POKEMON_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </S.CommonLabel>
      {children}
    </>
  );
});
