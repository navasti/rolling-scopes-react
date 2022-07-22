import React, { forwardRef } from 'react';
import { FIELDS } from 'appConstants';
import * as S from './styled';

type Props = {
  onChange: (field: string) => void;
  children: JSX.Element;
};

export const ConsentField = forwardRef<HTMLInputElement, Props>(({ children, onChange }, ref) => {
  return (
    <>
      <S.CheckboxField htmlFor={FIELDS.CONSENT}>
        <input
          onChange={() => onChange(FIELDS.CONSENT)}
          name={FIELDS.CONSENT}
          id={FIELDS.CONSENT}
          type="checkbox"
          ref={ref}
        />
        I have read and accept the regulations
      </S.CheckboxField>
      {children}
    </>
  );
});
