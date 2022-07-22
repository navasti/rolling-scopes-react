import questionmark from 'assets/images/questionmark.png';
import { CustomPokemon } from 'types';
import { capitalize } from 'utils';
import * as S from './styled';
import React from 'react';

type Props = {
  customPokemon: CustomPokemon;
};

export const FormCard = ({ customPokemon }: Props) => {
  const { avatar, birthday, gender, name, shiny, type } = customPokemon;
  return (
    <S.Card>
      <S.ImageWrapper>
        <img src={avatar ? URL.createObjectURL(avatar) : questionmark} />
      </S.ImageWrapper>
      <S.Details>
        <p>
          Name: <span>{capitalize(name)}</span>
        </p>
        <p>
          Gender: <span>{capitalize(gender)}</span>
        </p>
        <p>
          Main type: <span>{capitalize(type)}</span>
        </p>
        <p>
          Birthday: <span>{capitalize(birthday)}</span>
        </p>
        <p>
          Shiny: <span>{shiny ? 'Yes' : 'No'}</span>
        </p>
      </S.Details>
    </S.Card>
  );
};
