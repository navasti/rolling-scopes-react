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
export const INPUT_VALUE_KEY = 'input-value';
export const tabs = Object.values(AvailableTabs);

const BASE = 'https://pokeapi.co/api/v2';

export const API = {
  POKEMON_LIMIT: `?limit=${Limits.pokemon}`,
  TYPE_LIMIT: `?limit=${Limits.type}`,
  MOVE_LIMIT: `?limit=${Limits.move}`,
  POKEMON: `${BASE}/pokemon`,
  TYPE: `${BASE}/type`,
  MOVE: `${BASE}/move`,
  BASE,
};

export const POKEMON_TYPES = Object.values(Types);

export const FIELDS_VALIDATION_BY_NAME = {
  TEXT: [Fields.name, Fields.birthday, Fields.type],
  CHECK: [Fields.consent, Fields.gender],
};
