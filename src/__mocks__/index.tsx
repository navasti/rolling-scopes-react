import { ErrorMessages } from 'appConstants';
import { createRef, RefObject } from 'react';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonDetails,
  CustomPokemon,
  ErrorsObject,
  CheckFields,
  PokemonData,
  TextFields,
  PokemonType,
  Pokemon,
  PokemonMove,
} from 'types';

export const visible = true;
export const invisible = false;
export const isLoading = false;

export const errorRef: RefObject<HTMLSpanElement> = createRef();
export const inputRef: RefObject<HTMLInputElement> = createRef();
export const selectRef: RefObject<HTMLSelectElement> = createRef();

export const links = ['Home', 'About', 'Form', 'Invalid'];
export const componentName = 'About';
export const location = '/about';

export const TestingElement = () => <p>testing element</p>;
export const TestingErrorElement = () => <p>testing error</p>;

export const pokemonTypes: PokemonType = {
  name: 'typex',
  url: 'url',
};

export const pokemons: Pokemon = {
  name: 'pokemonix',
  url: 'url',
};

export const pokemonMoves: PokemonMove = {
  name: 'movix',
  url: 'url',
};

export const typeModalContentProperties = [
  'Double damage from',
  'Double damage to',
  'Half damage from',
  'Half damage to',
  'No damage from',
  'No damage to',
  'Pokemons',
  'Moves',
] as const;

export const moveModalContentProperties = [
  'Learned by',
  'Priority',
  'Accuracy',
  'Power',
  'Type',
  'PP',
] as const;

export const pokemonModalContentProperties = [
  'Pokemon statistics',
  'Pokemon abilities',
  'Base experience',
  'Height',
  'Weight',
  'Types',
] as const;

export const pokemonData: PokemonData = {
  results: [{ name: 'testName', url: 'testURL' }],
  previous: null,
  next: null,
  count: 1,
};

export const testOnChange = (field: TextFields | CheckFields) => console.log(field);

export const testEmptyErrors: ErrorsObject = {
  birthday: null,
  consent: null,
  gender: null,
  name: null,
  type: null,
};

export const testErrors: ErrorsObject = {
  birthday: ErrorMessages.birthday,
  consent: ErrorMessages.consent,
  gender: ErrorMessages.gender,
  name: ErrorMessages.name,
  type: ErrorMessages.type,
};

export const customPokemon: CustomPokemon = {
  birthday: '01-01-1999',
  name: 'pokemonix',
  gender: 'male',
  avatar: null,
  type: 'fire',
  shiny: true,
};

export const detailedTypes: Array<PokemonTypeDetails> = [
  {
    damage_relations: {
      double_damage_from: [],
      double_damage_to: [{ name: 'toTest', url: 'urlTest' }],
      half_damage_from: [{ name: 'fromTest', url: 'urlTest' }],
      half_damage_to: [],
      no_damage_from: [],
      no_damage_to: [],
    },
    pokemon: [{ pokemon: { name: 'pokemonTest', url: 'urlTest' }, slot: 1 }],
    moves: [{ name: 'moveTest', url: 'urlTest' }],
    name: 'typeTest',
    id: 10,
  },
];

export const detailedMoves: Array<PokemonMoveDetails> = [
  {
    learned_by_pokemon: [{ name: 'pokomonTest', url: 'urlTest' }],
    type: { name: 'typeTest', url: 'urlTest' },
    name: 'moveTest',
    accuracy: 60,
    priority: 0,
    power: 50,
    id: 20,
    pp: 15,
  },
];

export const detailedPokemons: Array<PokemonDetails> = [
  {
    abilities: [{ ability: { name: 'ability' }, is_hidden: false, slot: 2 }],
    stats: [{ base_stat: 33, effort: 33, stat: { name: 'test' } }],
    sprites: { back_default: 'url', front_default: 'url' },
    types: [{ slot: 2, type: { name: 'typeTest' } }],
    name: 'Testing pokemon',
    base_experience: 12,
    height: 15,
    weight: 10,
    id: 34,
  },
  {
    abilities: [{ ability: { name: 'ability2' }, is_hidden: true, slot: 1 }],
    stats: [{ base_stat: 22, effort: 22, stat: { name: 'test' } }],
    sprites: { back_default: 'url2', front_default: 'url2' },
    types: [{ slot: 2, type: { name: 'typeTest2' } }],
    name: 'Testing pokemon2',
    base_experience: 16,
    height: 11,
    weight: 11,
    id: 35,
  },
];

type Store = Record<string, string>;

export const localStorageMock = (() => {
  let store: Store = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();
