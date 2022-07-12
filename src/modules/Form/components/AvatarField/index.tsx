import React, { RefObject } from 'react';
import * as S from './styled';

type Props = {
  onClick: (errorRef: RefObject<HTMLSpanElement>) => void;
  refs: {
    inputRef: RefObject<HTMLInputElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

export const AvatarField = (props: Props) => {
  const { onClick, refs } = props;
  const { errorRef, inputRef } = refs;
  return (
    <>
      <S.FileField htmlFor="avatar">
        Avatar
        <input onClick={() => onClick(errorRef)} id="avatar" ref={inputRef} type="file" />
      </S.FileField>
      <S.ErrorMessage ref={errorRef}>Avatar is required</S.ErrorMessage>
    </>
  );
};
