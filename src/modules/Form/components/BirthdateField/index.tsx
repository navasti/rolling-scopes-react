import React, { RefObject } from 'react';
import { getTodayDate } from 'utils';
import * as S from './styled';

type Props = {
  onChange: (errorRef: RefObject<HTMLSpanElement>) => void;
  refs: {
    inputRef: RefObject<HTMLInputElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

export const BirthdayField = (props: Props) => {
  const { onChange, refs } = props;
  const { errorRef, inputRef } = refs;
  return (
    <>
      <S.CommonLabel htmlFor="birthdate">
        *Birthdate
        <input
          onChange={() => onChange(errorRef)}
          max={getTodayDate()}
          id="birthdate"
          ref={inputRef}
          type="date"
        />
      </S.CommonLabel>
      <S.ErrorMessage ref={errorRef}>Birthday of the pokemon is required</S.ErrorMessage>
    </>
  );
};
