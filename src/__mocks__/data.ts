import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonDetails,
  CustomPokemon,
  PokemonMove,
  PokemonType,
  Details,
  Pokemon,
} from 'types';

export const testingComponentName = 'Test';
export const testingLocation = '/test';

export const testingContent = 'Content';
export const testingTitle = 'Title';

export const baseData: Pokemon | PokemonType | PokemonMove = {
  name: 'baseName',
  url: 'baseUrl',
};

export const customPokemon: CustomPokemon = {
  birthday: '01-01-1999',
  name: 'charmander',
  gender: 'male',
  avatar: null,
  type: 'fire',
  shiny: true,
};

const samplePokemon = (): PokemonDetails => ({
  base_experience: 62,
  name: 'charmander',
  weight: 85,
  height: 6,
  id: 4,
  abilities: [
    {
      ability: { name: 'blaze', url: 'https://pokeapi.co/api/v2/ability/66/' },
      is_hidden: false,
      slot: 1,
    },
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
  },
  stats: [
    {
      base_stat: 52,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
    },
  ],
});

const sampleMove = (): PokemonMoveDetails => ({
  accuracy: 100,
  name: 'tackle',
  priority: 0,
  power: 40,
  id: 33,
  pp: 35,
  learned_by_pokemon: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
  ],
  type: {
    name: 'normal',
    url: 'https://pokeapi.co/api/v2/type/1/',
  },
});

const sampleType = (): PokemonTypeDetails => ({
  moves: [{ name: 'gust', url: 'https://pokeapi.co/api/v2/move/16/' }],
  name: 'flying',
  id: 3,
  damage_relations: {
    double_damage_from: [
      { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
      { name: 'rock', url: 'https://pokeapi.co/api/v2/type/6/' },
    ],
    double_damage_to: [{ name: 'fighting', url: 'https://pokeapi.co/api/v2/type/2/' }],
    half_damage_from: [{ name: 'bug', url: 'https://pokeapi.co/api/v2/type/7/' }],
    half_damage_to: [{ name: 'steel', url: 'https://pokeapi.co/api/v2/type/9/' }],
    no_damage_from: [{ name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/' }],
    no_damage_to: [],
  },
  pokemon: [
    { pokemon: { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' }, slot: 2 },
  ],
});

const prepareBuilder = <T extends Details>(sample: () => T) => {
  const builder = (object = sample()) => ({
    withName: (name: T['name']) => builder({ ...object, name }),
    withId: (id: T['id']) => builder({ ...object, id }),
    valueOf: () => object,
  });
  return builder;
};

const pokemonBuilder = prepareBuilder(samplePokemon);
const moveBuilder = prepareBuilder(sampleMove);
const typeBuilder = prepareBuilder(sampleType);

export const pokemonsMock: Array<PokemonDetails> = [
  pokemonBuilder().withId(1).withName('bulbasaur'),
  pokemonBuilder().withId(25).withName('pikachu'),
  pokemonBuilder(),
].map((builder) => builder.valueOf());

export const movesMock: Array<PokemonMoveDetails> = [
  moveBuilder().withId(55).withName('water-gun'),
  moveBuilder().withId(50).withName('disable'),
  moveBuilder(),
].map((builder) => builder.valueOf());

export const typesMock: Array<PokemonTypeDetails> = [
  typeBuilder().withId(2).withName('fighting'),
  typeBuilder().withId(5).withName('ground'),
  typeBuilder(),
].map((builder) => builder.valueOf());
