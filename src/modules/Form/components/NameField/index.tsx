import React, { RefObject } from 'react';
import * as S from './styled';

type Props = {
  onChange: (errorRef: RefObject<HTMLSpanElement>) => void;
  refs: {
    inputRef: RefObject<HTMLInputElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

export const NameField = (props: Props) => {
  const { onChange, refs } = props;
  const { errorRef, inputRef } = refs;

  return (
    <>
      <S.CommonLabel htmlFor="name">
        *Name
        <input
          onChange={() => onChange(errorRef)}
          placeholder="name"
          ref={inputRef}
          type="text"
          id="name"
        />
      </S.CommonLabel>
      <S.ErrorMessage ref={errorRef}>Name must contain at least 2 characters</S.ErrorMessage>
    </>
  );
};
