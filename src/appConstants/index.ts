import { FormFields, LimitParams } from 'types';
import * as yup from 'yup';

export enum Limits {
  pokemon = 20,
  type = 10,
  move = 15,
}

export enum ErrorStatuses {
  success = '2',
  client = '4',
  server = '5',
}

export enum AvailableTabs {
  pokemons = 'pokemons',
  moves = 'moves',
  types = 'types',
}

export enum Fields {
  birthday = 'birthday',
  consent = 'consent',
  gender = 'gender',
  avatar = 'avatar',
  shiny = 'shiny',
  name = 'name',
  type = 'type',
}

export enum ErrorMessages {
  name = 'Name must be at least 2 characters long.',
  consent = 'Regulations consent is required.',
  birthday = 'Birthday is required.',
  type = 'Main type is required.',
  gender = 'Gender is required.',
}

export enum Types {
  fire = 'fire',
  grass = 'grass',
  poison = 'poison',
  flying = 'flying',
  ground = 'ground',
  psycho = 'psycho',
  water = 'water',
  ice = 'ice',
}

export const NONE = 'none';
export const MALE = 'male';
export const FEMALE = 'female';
export const MESSAGE_HIDE_TIME = 5000;
export const INPUT_VALUE_KEY = 'input-value';
export const SUCCESS_MESSAGE = 'Pokemon added successfuly';
export const LINKS = ['home', 'about', 'form', 'invalid'] as const;
export const SEARCH_BAR_INSTRUCTIONS = [
  'Type and press enter to search for specific pokemon, type or move.',
  'Clear input and press enter to search for all pokemons, types and moves.',
] as const;

export const TABS = Object.values(AvailableTabs);
export const POKEMON_TYPES = Object.values(Types);

export const API = (({ typeLimit, moveLimit, pokemonLimit }: LimitParams) => {
  const BASE = 'https://pokeapi.co/api/v2';
  const setLimit = (limit: number) => `?limit=${limit}`;
  return {
    POKEMON_LIMIT: setLimit(pokemonLimit),
    TYPE_LIMIT: setLimit(typeLimit),
    MOVE_LIMIT: setLimit(moveLimit),
    POKEMON: `${BASE}/pokemon`,
    TYPE: `${BASE}/type`,
    MOVE: `${BASE}/move`,
    BASE,
  };
})({ moveLimit: Limits.move, pokemonLimit: Limits.pokemon, typeLimit: Limits.type });

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  type: yup.string().required(ErrorMessages.type),
  name: yup.string().min(2, ErrorMessages.name).required(ErrorMessages.name),
  gender: yup.string().nullable().required(ErrorMessages.gender),
  birthday: yup.string().required(ErrorMessages.birthday),
  consent: yup.bool().oneOf([true], ErrorMessages.consent),
});

export const FIELDS_VALIDATION_BY_NAME = {
  TEXT: [Fields.name, Fields.birthday, Fields.type],
  CHECK: [Fields.consent, Fields.gender],
};

export const DEFAULT_VALUES: FormFields = {
  consent: false,
  avatar: null,
  gender: MALE,
  shiny: false,
  birthday: '',
  name: '',
  type: '',
};
