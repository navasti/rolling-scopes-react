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

export type Pokemon = {
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
