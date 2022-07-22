import React, { forwardRef } from 'react';
import { FIELDS } from 'appConstants';
import * as S from './styled';

type Props = {
  onChange: (field: string) => void;
  children: JSX.Element;
};

export const NameField = forwardRef<HTMLInputElement, Props>(({ children, onChange }, ref) => {
  return (
    <>
      <S.CommonLabel htmlFor={FIELDS.NAME}>
        *Name
        <input
          onChange={() => onChange(FIELDS.NAME)}
          placeholder={FIELDS.NAME}
          name={FIELDS.NAME}
          id={FIELDS.NAME}
          type="text"
          ref={ref}
        />
      </S.CommonLabel>
      {children}
    </>
  );
});
