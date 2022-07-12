import * as S from './styled';
import React, { RefObject } from 'react';

type Props = {
  onClick: (errorRef: RefObject<HTMLSpanElement>) => void;
  refs: {
    femaleInputRef: RefObject<HTMLInputElement>;
    maleInputRef: RefObject<HTMLInputElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

export const GenderField = (props: Props) => {
  const { onClick, refs } = props;
  const { errorRef, femaleInputRef, maleInputRef } = refs;
  return (
    <>
      <S.RadioWrapper>
        Gender
        <div>
          <S.RadioField htmlFor="male">
            <input
              onClick={() => onClick(errorRef)}
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
              onClick={() => onClick(errorRef)}
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
