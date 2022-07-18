import React, { RefObject } from 'react';
import * as S from './styled';

type Props = {
  refs: {
    inputRef: RefObject<HTMLInputElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

export const AvatarField = (props: Props) => {
  const { errorRef, inputRef } = props.refs;
  return (
    <>
      <S.FileField htmlFor="avatar">
        Avatar
        <input id="avatar" ref={inputRef} type="file" />
      </S.FileField>
      <S.ErrorMessage ref={errorRef}>Avatar is required</S.ErrorMessage>
    </>
  );
};
