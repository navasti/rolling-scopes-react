import * as S from './styled';
import React, { RefObject } from 'react';

type Props = {
  onChange: (errorRef: RefObject<HTMLSpanElement>) => void;
  refs: {
    femaleInputRef: RefObject<HTMLInputElement>;
    maleInputRef: RefObject<HTMLInputElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

export const GenderField = (props: Props) => {
  const { onChange, refs } = props;
  const { errorRef, femaleInputRef, maleInputRef } = refs;
  return (
    <>
      <S.RadioWrapper>
        *Gender
        <div>
          <S.RadioField htmlFor="male">
            <input
              onChange={() => onChange(errorRef)}
              ref={maleInputRef}
              name="gender"
              type="radio"
              value="male"
              id="male"
            />
            Male
          </S.RadioField>
          <S.RadioField htmlFor="female">
            <input
              onChange={() => onChange(errorRef)}
              ref={femaleInputRef}
              value="female"
              name="gender"
              type="radio"
              id="female"
            />
            Female
          </S.RadioField>
        </div>
      </S.RadioWrapper>
      <S.ErrorMessage ref={errorRef}>Gender of the pokemon is required</S.ErrorMessage>
    </>
  );
};
