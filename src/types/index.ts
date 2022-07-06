export interface PokemonDetails {
  abilities: Array<Ability>;
  base_experience: number;
  types: Array<Type>;
  stats: Array<Stat>;
  sprites: Sprites;
  height: number;
  weight: number;
  name: string;
  id: number;
}

export interface PokemonData {
  previous: null | string;
  results: Array<Pokemon>;
  count: number;
  next: string;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface Ability {
  ability: {
    name: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
  };
}

export interface Sprites {
  back_default: string;
  front_default: string;
}

export interface PokemonDetails {
  abilities: Array<Ability>;
  base_experience: number;
  types: Array<Type>;
  stats: Array<Stat>;
  sprites: Sprites;
  height: number;
  weight: number;
  name: string;
  id: number;
}
