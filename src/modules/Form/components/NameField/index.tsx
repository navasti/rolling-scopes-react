import React, { RefObject } from 'react';
import * as S from './styled';

type Props = {
  onClick: (errorRef: RefObject<HTMLSpanElement>) => void;
  refs: {
    inputRef: RefObject<HTMLInputElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

export const NameField = (props: Props) => {
  const { onClick, refs } = props;
  const { errorRef, inputRef } = refs;
  return (
    <>
      <S.CommonLabel htmlFor="name">
        *Name
        <input
          onClick={() => onClick(errorRef)}
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
