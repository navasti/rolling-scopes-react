import { CustomPokemon, ErrorsObject, PokemonData, PokemonDetails } from 'types';
import { CHECK_FIELDS, ERROR_MESSAGES, TEXT_FIELDS } from 'appConstants';
import { createRef, RefObject } from 'react';

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

export const pokemons: PokemonData = {
  results: [{ name: 'testName', url: 'testURL' }],
  previous: null,
  next: null,
  count: 1,
};

export const testOnChange = (field: TEXT_FIELDS | CHECK_FIELDS) => console.log(field);

export const testEmptyErrors: ErrorsObject = {
  birthday: null,
  consent: null,
  gender: null,
  name: null,
  type: null,
};

export const testErrors: ErrorsObject = {
  birthday: ERROR_MESSAGES.birthday,
  consent: ERROR_MESSAGES.consent,
  gender: ERROR_MESSAGES.gender,
  name: ERROR_MESSAGES.name,
  type: ERROR_MESSAGES.type,
};

export const customPokemon: CustomPokemon = {
  birthday: '01-01-1999',
  name: 'pokemonix',
  gender: 'male',
  avatar: null,
  type: 'fire',
  shiny: true,
};

export const detailedPokemons: Array<PokemonDetails> = [
  {
    abilities: [{ ability: { name: 'ability' }, is_hidden: false, slot: 2 }],
    stats: [{ base_stat: 33, effort: 33, stat: { name: 'test' } }],
    sprites: { back_default: 'url', front_default: 'url' },
    types: [{ slot: 2, type: { name: 'test' } }],
    name: 'Testing pokemon',
    base_experience: 10,
    height: 10,
    weight: 10,
    id: 34,
  },
  {
    abilities: [{ ability: { name: 'ability2' }, is_hidden: true, slot: 1 }],
    stats: [{ base_stat: 22, effort: 22, stat: { name: 'test' } }],
    sprites: { back_default: 'url2', front_default: 'url2' },
    types: [{ slot: 2, type: { name: 'test2' } }],
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
