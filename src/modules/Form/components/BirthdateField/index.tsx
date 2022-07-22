import React, { forwardRef } from 'react';
import { FIELDS } from 'appConstants';
import { getTodayDate } from 'utils';
import * as S from './styled';

type Props = {
  onChange: (field: string) => void;
  children: JSX.Element;
};

export const BirthdayField = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { children, onChange } = props;
  return (
    <>
      <S.CommonLabel htmlFor={FIELDS.BIRTHDAY}>
        *Birthday
        <input
          onChange={() => onChange(FIELDS.BIRTHDAY)}
          max={getTodayDate()}
          name={FIELDS.BIRTHDAY}
          id={FIELDS.BIRTHDAY}
          type="date"
          ref={ref}
        />
      </S.CommonLabel>
      {children}
    </>
  );
});
