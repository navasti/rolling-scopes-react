import { CustomPokemon } from 'types';
import React from 'react';

type Props = {
  customPokemon: CustomPokemon;
};

export const FormCard = ({ customPokemon }: Props) => {
  return (
    <div>
      <p>{customPokemon.name}</p>
      <span>{customPokemon.birthday}</span>
      <span>{customPokemon.gender}</span>
      <span>{customPokemon.shiny}</span>
      <span>{customPokemon.type}</span>
    </div>
  );
};
