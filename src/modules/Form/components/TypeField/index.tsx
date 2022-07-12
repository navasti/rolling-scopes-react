import React, { RefObject } from 'react';
import * as S from './styled';

type Props = {
  onClick: (errorRef: RefObject<HTMLSpanElement>) => void;
  refs: {
    selectRef: RefObject<HTMLSelectElement>;
    errorRef: RefObject<HTMLSpanElement>;
  };
};

const pokemonTypes = ['fire', 'grass', 'poison', 'flying', 'ground', 'psycho', 'water', 'ice'];

export const TypeField = (props: Props) => {
  const { onClick, refs } = props;
  const { errorRef, selectRef } = refs;
  return (
    <>
      <S.CommonLabel htmlFor="type">
        Main type
        <select id="type" ref={selectRef} onClick={() => onClick(errorRef)}>
          <option value=""></option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </S.CommonLabel>
      <S.ErrorMessage ref={errorRef}>Type of the pokemon is required</S.ErrorMessage>
    </>
  );
};
