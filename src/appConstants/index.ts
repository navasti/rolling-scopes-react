import { FormFields } from 'types';
import * as yup from 'yup';

export enum Limits {
  allPokemons = 1154,
  allMoves = 844,
  allTypes = 20,
  pokemon = 20,
  type = 15,
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
export const INPUT_VALUE_KEY = 'input-value';
export const SUCCESS_MESSAGE = 'Pokemon added successfuly';
export const LINKS = ['home', 'about', 'form', 'invalid', 'details'] as const;
export const SEARCH_BAR_INSTRUCTIONS = [
  'Type and press enter to search for specific pokemon, type or move.',
  'Clear input and press enter to search for all pokemons, types and moves.',
] as const;

export const TABS = Object.values(AvailableTabs);
export const POKEMON_TYPES = Object.values(Types);

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  type: yup.string().required(ErrorMessages.type),
  name: yup.string().min(2, ErrorMessages.name).required(ErrorMessages.name),
  gender: yup.string().nullable().required(ErrorMessages.gender),
  avatar: yup
    .mixed()
    .test('fileSize', 'The file is too large', (value) =>
      !value?.length ? true : value?.[0]?.size <= 200000
    ),
  birthday: yup.string().required(ErrorMessages.birthday),
  consent: yup.bool().oneOf([true], ErrorMessages.consent),
  shiny: yup.bool(),
});

export const NO_IMAGE_PLACEHOLDER = 'https://via.placeholder.com/200';

const BASE = 'https://pokeapi.co/api/v2';

export const API = {
  getPokemonsOffset: (page: number) => `offset=${page * Limits.pokemon - Limits.pokemon}`,
  getMovesOffset: (page: number) => `offset=${page * Limits.move - Limits.move}`,
  getTypesOffset: (page: number) => `offset=${page * Limits.type - Limits.type}`,

  ALL_POKEMONS: `${BASE}/pokemon?limit=${Limits.allPokemons}`,
  ALL_MOVES: `${BASE}/move?limit=${Limits.allMoves}`,
  ALL_TYPES: `${BASE}/type?limit=${Limits.allTypes}`,

  POKEMON_LIMIT: `?limit=${Limits.pokemon}`,
  TYPE_LIMIT: `?limit=${Limits.type}`,
  MOVE_LIMIT: `?limit=${Limits.move}`,

  POKEMON: `${BASE}/pokemon`,
  TYPE: `${BASE}/type`,
  MOVE: `${BASE}/move`,
  BASE,
};

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
