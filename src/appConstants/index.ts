export const INPUT_VALUE_KEY = 'input-value';

export const MALE = 'male';
export const FEMALE = 'female';

enum Limits {
  pokemon = 20,
  type = 10,
  move = 15,
}

type LimitParams = {
  pokemonLimit: Limits.pokemon;
  typeLimit: Limits.type;
  moveLimit: Limits.move;
};

export enum AvailableTabs {
  pokemons = 'pokemons',
  moves = 'moves',
  types = 'types',
}

export const tabs = Object.values(AvailableTabs);

type PrepareLengths<Arr extends typeof tabs> = {
  [P in Arr[number] as P]: number;
};

export type Lengths = PrepareLengths<typeof tabs>;

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
