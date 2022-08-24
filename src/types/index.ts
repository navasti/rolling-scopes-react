import { AvailableTabs, FEMALE, Fields, Limits, MALE, TABS } from 'appConstants';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ChangeEvent, KeyboardEvent, RefObject } from 'react';

export type TextFields = Fields.name | Fields.birthday | Fields.type;
export type CheckFields = Fields.consent | Fields.gender;
export type Lengths = PrepareLengths<typeof TABS>;
export type PrepareLengths<Arr extends typeof TABS> = {
  [P in Arr[number] as P]: number;
};

export enum SearchActionType {
  currentPokemonResults = 'currentPokemonResults',
  currentMoveResults = 'currentMoveResults',
  currentTypeResults = 'currentTypeResults',
  pokemonsSorting = 'pokemonSorting',
  movesSorting = 'moveSorting',
  typesSorting = 'typeSorting',
  sortingData = 'sortingData',
  isLoading = 'isLoading',
  pokemons = 'pokemons',
  lengths = 'lengths',
  types = 'types',
  moves = 'moves',
  page = 'page',
  tab = 'tab',
}

export enum MessageType {
  error = 'error',
  success = 'success',
}

export enum AvailableCardDetails {
  pokemon = 'pokemon',
  move = 'move',
  type = 'type',
}

export enum MovesSorting {
  alphabetical = 'alphabetical',
  accuracy = 'accuracy',
  power = 'power',
  none = 'none',
  pp = 'pp',
}

export enum TypesSorting {
  pokemonsAmount = 'pokemons amount',
  alphabetical = 'alphabetical',
  movesAmount = 'moves amount',
  none = 'none',
}

export enum PokemonsSorting {
  baseExperience = 'base experience',
  alphabetical = 'alphabetical',
  height = 'height',
  weight = 'weight',
  none = 'none',
}

export type FormState = {
  customPokemons: Array<CustomPokemon & { id: string }>;
};

export type FormContextProps = {
  addPokemon: (pokemon: CustomPokemon & { id: string }) => void;
  formState: FormState;
};

export type FormAction = {
  type: FormActionType;
  payload: Partial<FormState>;
};

export type SearchContextProps = {
  setCurrentPokemonResults: (currentPokemonResults: Array<PokemonDetails>) => void;
  setCurrentTypeResults: (currentTypeResults: Array<PokemonTypeDetails>) => void;
  setCurrentMoveResults: (currentMoveResults: Array<PokemonMoveDetails>) => void;
  setSortingData: (sortingData: BaseSortingData) => void;
  setPokemonsSorting: (sorting: PokemonsSorting) => void;
  setTypesSorting: (typesSorting: TypesSorting) => void;
  setPokemons: (pokemons: BasePokemonsData) => void;
  setActiveTab: (activeTab: AvailableTabs) => void;
  setMovesSorting: (sorting: MovesSorting) => void;
  setIsLoading: (isLoading: boolean) => void;
  setMoves: (moves: BaseMovesData) => void;
  setTypes: (types: BaseTypesData) => void;
  setLengths: (lengths: Lengths) => void;
  setPage: (page: number) => void;
  searchState: SearchState;
};

export enum FormActionType {
  addPokemon = 'addPokemon',
}

export type SearchState = {
  sortingData: BaseSortingData | null;
  selectedDetails?: CardDetails;
  pokemonsSorting: PokemonsSorting;
  pokemons: BasePokemonsData;
  movesSorting: MovesSorting;
  typesSorting: TypesSorting;
  activeTab: AvailableTabs;
  types: BaseTypesData;
  moves: BaseMovesData;
  isLoading: boolean;
  lengths: Lengths;
  page: number;
};

export type SearchAction = {
  type: SearchActionType;
  payload: Partial<SearchState> & {
    currentPokemonResults?: Array<PokemonDetails>;
    currentMoveResults?: Array<PokemonMoveDetails>;
    currentTypeResults?: Array<PokemonTypeDetails>;
  };
};

export type MessageProps = {
  message: string | null;
  type: MessageType;
  visible: boolean;
  center?: boolean;
};

export type CardDetails = PokemonDetails | PokemonMoveDetails | PokemonTypeDetails;

export type CardsProps = {
  types: Array<PokemonTypeDetails>;
  moves: Array<PokemonMoveDetails>;
  pokemons: Array<PokemonDetails>;
  activeTab: AvailableTabs;
  isLoading: boolean;
};
export type LayoutProps = {
  children: JSX.Element;
  componentName: string;
  location: string;
};

export type TabsProps = {
  onClick: (tab: AvailableTabs) => void;
  activeTab: AvailableTabs;
  options: typeof TABS;
  isLoading: boolean;
  lengths: Lengths;
};

export type SearchBarProps = {
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  isLoading: boolean;
  label: string;
};

export type FormFields = {
  gender: typeof MALE | typeof FEMALE;
  avatar: FileList | null;
  consent: boolean;
  birthday: string;
  shiny: boolean;
  name: string;
  type: string;
};

export type FieldReturnType<T extends Fields> = {
  name: string;
  maxDate?: string;
  error?: string;
  value?: string;
} & UseFormRegisterReturn<T>;

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

export type CardBase = BasePokemonsData | BaseTypesData | BaseMovesData;

export type BaseSearchMovesData = {
  currentPageResults?: Array<PokemonMoveDetails>;
  results: Array<PokemonMoveDetails>;
  previous: null | string;
  next: null | string;
  count: number;
};
export type BaseSearchPokemonsData = {
  currentPageResults?: Array<PokemonDetails>;
  results: Array<PokemonDetails>;
  previous: null | string;
  next: null | string;
  count: number;
};
export type BaseSearchTypesData = {
  currentPageResults?: Array<PokemonTypeDetails>;
  results: Array<PokemonTypeDetails>;
  previous: null | string;
  next: null | string;
  count: number;
};

export type BaseSortingData = {
  pokemons: BaseSearchPokemonsData;
  moves: BaseSearchMovesData;
  types: BaseSearchTypesData;
};

export type BasePokemonsData = {
  currentPageResults?: Array<PokemonDetails>;
  previous: null | string;
  results: Array<Pokemon>;
  next: null | string;
  count: number;
};

export type BaseTypesData = {
  currentPageResults?: Array<PokemonTypeDetails>;
  results: Array<PokemonType>;
  previous: null | string;
  next: null | string;
  count: number;
};

export type BaseMovesData = {
  currentPageResults?: Array<PokemonMoveDetails>;
  results: Array<PokemonMove>;
  previous: null | string;
  next: null | string;
  count: number;
};

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
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Sprites = {
  back_default: string | null;
  front_default: string | null;
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
  gender: typeof MALE | typeof FEMALE;
  avatar: File | null;
  birthday: string;
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
