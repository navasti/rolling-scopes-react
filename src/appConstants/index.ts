// export const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';
export const INPUT_VALUE_KEY = 'input-value';

export const MALE = 'male';
export const FEMALE = 'female';

export const API = (() => {
  const BASE = 'https://pokeapi.co/api/v2';
  return {
    POKEMONS: `${BASE}/pokemon?limit=50&offset=0`,
    NAME: `${BASE}/pokemon`,
    TYPE: `${BASE}/type`,
    MOVE: `${BASE}/move`,
    BASE,
  };
})();

export enum TYPES {
  fire = 'fire',
  grass = 'grass',
  poison = 'poison',
  flying = 'flying',
  ground = 'ground',
  psycho = 'psycho',
  water = 'water',
  ice = 'ice',
}

export const POKEMON_TYPES = Object.values(TYPES);

export enum FIELDS {
  birthday = 'birthday',
  consent = 'consent',
  gender = 'gender',
  avatar = 'avatar',
  shiny = 'shiny',
  name = 'name',
  type = 'type',
}

export enum ERROR_MESSAGES {
  name = 'Name must be at least 2 characters long.',
  consent = 'Regulations consent is required.',
  birthday = 'Birthday is required.',
  type = 'Main type is required.',
  gender = 'Gender is required.',
}

export type TEXT_FIELDS = FIELDS.name | FIELDS.birthday | FIELDS.type;
export type CHECK_FIELDS = FIELDS.consent | FIELDS.gender;

export const FIELDS_VALIDATION_BY_NAME = {
  TEXT: [FIELDS.name, FIELDS.birthday, FIELDS.type],
  CHECK: [FIELDS.consent, FIELDS.gender],
};
