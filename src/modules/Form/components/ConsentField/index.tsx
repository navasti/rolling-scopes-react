import React, { RefObject } from 'react';
import * as S from './styled';

type Props = {
  onClick: (errorRef: RefObject<HTMLSpanElement>) => void;
  refs: {
    inputRef: RefObject<HTMLInputElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

export const ConsentField = (props: Props) => {
  const { onClick, refs } = props;
  const { errorRef, inputRef } = refs;
  return (
    <>
      <S.CheckboxField htmlFor="consent">
        <input id="consent" onClick={() => onClick(errorRef)} ref={inputRef} type="checkbox" /> I
        have read and accept the regulations
      </S.CheckboxField>
      <S.ErrorMessage ref={errorRef}>Acceptation of the regulations is required</S.ErrorMessage>
    </>
  );
};
