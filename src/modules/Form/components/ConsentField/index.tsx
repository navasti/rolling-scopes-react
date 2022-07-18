import React, { RefObject } from 'react';
import * as S from './styled';

type Props = {
  onChange: (errorRef: RefObject<HTMLSpanElement>) => void;
  refs: {
    inputRef: RefObject<HTMLInputElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

export const ConsentField = (props: Props) => {
  const { onChange, refs } = props;
  const { errorRef, inputRef } = refs;
  return (
    <>
      <S.CheckboxField htmlFor="consent">
        <input id="consent" onChange={() => onChange(errorRef)} ref={inputRef} type="checkbox" /> I
        have read and accept the regulations
      </S.CheckboxField>
      <S.ErrorMessage ref={errorRef}>Acceptation of the regulations is required</S.ErrorMessage>
    </>
  );
};
