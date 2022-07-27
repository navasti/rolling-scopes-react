import { Fields, Limits, tabs } from 'appConstants';
import { RefObject } from 'react';

export type TextFields = Fields.name | Fields.birthday | Fields.type;
export type CheckFields = Fields.consent | Fields.gender;
export type Lengths = PrepareLengths<typeof tabs>;
export type PrepareLengths<Arr extends typeof tabs> = {
  [P in Arr[number] as P]: number;
};

export type LimitParams = {
  pokemonLimit: Limits.pokemon;
  typeLimit: Limits.type;
  moveLimit: Limits.move;
};

export type PokemonDetails = {
  abilities: Array<Ability>;
  base_experience: number;
  types: Array<Type>;
  stats: Array<Stat>;
  sprites: Sprites;
  height: number;
  weight: number;
  name: string;
  id: number;
};

export type PokemonData = {
  previous: null | string;
  results: Array<Pokemon>;
  next: null | string;
  count: number;
};

export type TypesData = {
  previous: null | string;
  results: Array<PokemonType>;
  next: null | string;
  count: number;
};

export type MovesData = {
  results: Array<PokemonMove>;
  previous: null | string;
  next: null | string;
  count: number;
};

export type MockBaseDataType = Pokemon | PokemonMove | PokemonType;
export type MockDetailedDataType = PokemonDetails | PokemonMoveDetails | PokemonTypeDetails;

export type DamageRelations = {
  double_damage_from: Array<PokemonType>;
  double_damage_to: Array<PokemonType>;
  half_damage_from: Array<PokemonType>;
  half_damage_to: Array<PokemonType>;
  no_damage_from: Array<PokemonType>;
  no_damage_to: Array<PokemonType>;
};

export type PokemonTypeDetails = {
  pokemon: Array<{ pokemon: Pokemon; slot: number }>;
  damage_relations: DamageRelations;
  moves: Array<PokemonMove>;
  name: string;
  id: number;
};

export type PokemonType = {
  name: string;
  url: string;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonMove = {
  name: string;
  url: string;
};

export type PokemonMoveDetails = {
  learned_by_pokemon: Array<Pokemon>;
  type: PokemonType;
  accuracy: number;
  priority: number;
  power: number;
  name: string;
  pp: number;
  id: number;
};

export type Location = {
  name: string;
  url: string;
};

export type LocationDetails = {
  areas: Array<Area>;
  region: Region;
  name: string;
  id: number;
};

export type RegionDetails = {
  locations: Array<Location>;
  id: number;
};

export type AreaDetails = {
  pokemon_encounteres: Array<{ pokemon: Pokemon; slot: number }>;
  game_index: number;
  name: string;
  id: number;
};

export type Region = {
  name: string;
  url: string;
};

export type Area = {
  name: string;
  url: string;
};

export type Ability = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
};

export type Type = {
  slot: number;
  type: {
    name: string;
  };
};

export type Sprites = {
  back_default: string;
  front_default: string;
};

export type CommonFieldType = {
  inputRef: RefObject<HTMLInputElement>;
  errorRef: RefObject<HTMLSpanElement>;
};

export type GenderFieldType = {
  femaleInputRef: RefObject<HTMLInputElement>;
  maleInputRef: RefObject<HTMLInputElement>;
  errorRef: RefObject<HTMLSpanElement>;
};

export type SelectFieldType = {
  selectRef: RefObject<HTMLSelectElement>;
  errorRef: RefObject<HTMLSpanElement>;
};

export type CustomPokemon = {
  avatar: File | null;
  birthday: string;
  gender: string;
  shiny: boolean;
  name: string;
  type: string;
};

export type ErrorsObject = {
  birthday: null | string;
  consent: null | string;
  gender: null | string;
  name: null | string;
  type: null | string;
};
