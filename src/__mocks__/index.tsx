import { PokemonData, PokemonDetails } from 'types';

export const isLoading = false;

export const links = ['Home', 'About', 'Forms', 'Invalid'];

export const TestingElement = () => <p>testing element</p>;

export const componentName = 'About';

export const location = '/about';

export const pokemons: PokemonData = {
  results: [{ name: 'testName', url: 'testURL' }],
  previous: null,
  next: null,
  count: 1,
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
