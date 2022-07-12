import React, { RefObject } from 'react';
import * as S from './styled';

type Props = {
  inputRef: RefObject<HTMLInputElement>;
};

export const ShinyField = ({ inputRef }: Props) => {
  return (
    <S.SwitchWrapper>
      Shiny
      <S.SwitchField htmlFor="shiny">
        <input id="shiny" ref={inputRef} type="checkbox" />
        <span></span>
      </S.SwitchField>
    </S.SwitchWrapper>
  );
};
