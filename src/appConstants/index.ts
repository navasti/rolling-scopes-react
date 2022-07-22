export const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';
export const INPUT_VALUE_KEY = 'input-value';

export const MALE = 'male';
export const FEMALE = 'female';
export const POKEMON_TYPES = [
  'fire',
  'grass',
  'poison',
  'flying',
  'ground',
  'psycho',
  'water',
  'ice',
];

export const FIELDS = {
  BIRTHDAY: 'birthday',
  CONSENT: 'consent',
  GENDER: 'gender',
  AVATAR: 'avatar',
  SHINY: 'shiny',
  NAME: 'name',
  TYPE: 'type',
};

export const ERROR_MESSAGES = {
  NAME: 'Name must be at least 2 characters long.',
  CONSENT: 'Regulations consent is required.',
  BIRTHDAY: 'Birthday is required.',
  TYPE: 'Main type is required.',
  GENDER: 'Gender is required.',
};

export const FIELDS_VALIDATION_BY_NAME = {
  TEXT: [FIELDS.NAME, FIELDS.BIRTHDAY, FIELDS.TYPE],
  CHECK: [FIELDS.CONSENT, FIELDS.GENDER],
};
