import { AvailableTabs, FEMALE, Fields, Limits, MALE, TABS } from 'appConstants';
import { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type TextFields = Fields.name | Fields.birthday | Fields.type;
export type CheckFields = Fields.consent | Fields.gender;

export enum MoveActionType {
  setCurrentPageResults = 'setCurrentPageResults',
  setAllDataResults = 'setAllDataResults',
  setResultsAmount = 'setResultsAmount',
  setSearchResults = 'setSearchResults',
  setCurrentPage = 'setCurrentPage',
  setBaseData = 'setBaseData',
  setSorting = 'setSorting',
}

export enum SearchActionType {
  searchingResults = 'searchingResults',
  isLoading = 'isLoading',
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

export enum MoveSorting {
  none = 'none',
  alphabetical = 'alphabetical',
  accuracy = 'accuracy',
  power = 'power',
  pp = 'pp',
}

export enum PokemonSorting {
  none = 'none',
  baseExperience = 'base experience',
  alphabetical = 'alphabetical',
  height = 'height',
  weight = 'weight',
}

export type Details = PokemonDetails | PokemonMoveDetails | PokemonTypeDetails;

export type SearchResults = {
  pokemons: Array<PokemonDetails> | null;
  types: Array<PokemonTypeDetails> | null;
  moves: Array<PokemonMoveDetails> | null;
};

export type AllDataResults = {
  pokemons: Array<PokemonDetails>;
  moves: Array<PokemonMoveDetails>;
  types: Array<PokemonTypeDetails>;
};

export type CurrentPageResults = {
  pokemons: Array<PokemonDetails>;
  moves: Array<PokemonMoveDetails>;
  types: Array<PokemonTypeDetails>;
};

export type BaseData = {
  pokemons: PokemonBaseData | null;
  moves: MoveBaseData | null;
  types: TypeBaseData | null;
};

export type Sorting = {
  pokemons: PokemonSorting;
  moves: MoveSorting;
  types: TypeSorting;
};

export type CurrentPage = { pokemons: number; moves: number; types: number };

export type ResultsAmount = { pokemons: number; moves: number; types: number };

export type PokemonBaseData = {
  previous: null | string;
  results: Array<Pokemon>;
  next: null | string;
  count: number;
};

export type MoveContextState = {
  searchResults: Array<PokemonMoveDetails> | null;
  currentPageResults: Array<PokemonMoveDetails>;
  allDataResults: Array<PokemonMoveDetails>;
  baseData: MoveBaseData;
  resultsAmount: number;
  sorting: MoveSorting;
  currentPage: number;
};

export type MoveContextProps = {
  setCurrentPageResults: (currentPageResults: Array<PokemonMoveDetails>) => void;
  setSearchResults: (searchResults: Array<PokemonMoveDetails> | null) => void;
  setAllDataResults: (allDataResults: Array<PokemonMoveDetails>) => void;
  setResultsAmount: (resultsAmount: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setBaseData: (baseData: MoveBaseData) => void;
  setSorting: (sorting: MoveSorting) => void;
  moveState: MoveContextState;
};

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
  setActiveTab: (activeTab: AvailableTabs) => void;
  setIsLoading: (isLoading: boolean) => void;
  searchState: SearchState;
};

export enum FormActionType {
  addPokemon = 'addPokemon',
}

export type SearchState = {
  activeTab: AvailableTabs;
  isLoading: boolean;
};

export type SearchAction = {
  type: SearchActionType;
  payload: Partial<SearchState>;
};

export type MessageProps = {
  message: string | null;
  type: MessageType;
  visible: boolean;
  center?: boolean;
};

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

export type PokemonContextState = {
  searchResults: Array<PokemonDetails> | null;
  currentPageResults: Array<PokemonDetails>;
  allDataResults: Array<PokemonDetails>;
  baseData: PokemonBaseData;
  sorting: PokemonSorting;
  resultsAmount: number;
  currentPage: number;
};

export type PokemonContextProps = {
  setCurrentPageResults: (currentPageResults: Array<PokemonDetails>) => void;
  setSearchResults: (searchResults: Array<PokemonDetails> | null) => void;
  setAllDataResults: (allDataResults: Array<PokemonDetails>) => void;
  setResultsAmount: (resultsAmount: number) => void;
  setBaseData: (baseData: PokemonBaseData) => void;
  setCurrentPage: (currentPage: number) => void;
  setSorting: (sorting: PokemonSorting) => void;
  pokemonState: PokemonContextState;
};

export type PokemonAction = {
  type: PokemonActionType;
  payload: Partial<PokemonContextState>;
};

export enum PokemonActionType {
  setCurrentPageResults = 'setCurrentPageResults',
  setAllDataResults = 'setAllDataResults',
  setSearchResults = 'setSearchResults',
  setResultsAmount = 'setResultsAmount',
  setCurrentPage = 'setCurrentPage',
  setBaseData = 'setBaseData',
  setSorting = 'setSorting',
}

export enum TypeSorting {
  none = 'none',
  pokemonsAmount = 'pokemons amount',
  alphabetical = 'alphabetical',
  movesAmount = 'moves amount',
}
export type TypeBaseData = {
  previous: null | string;
  results: Array<PokemonType>;
  next: null | string;
  count: number;
};

export enum TypeActionType {
  setCurrentPageResults = 'setCurrentPageResults',
  setAllDataResults = 'setAllDataResults',
  setSearchResults = 'setSearchResults',
  setResultsAmount = 'setResultsAmount',
  setCurrentPage = 'setCurrentPage',
  setBaseData = 'setBaseData',
  setSorting = 'setSorting',
}

export type TypeContextState = {
  searchResults: Array<PokemonTypeDetails> | null;
  currentPageResults: Array<PokemonTypeDetails>;
  allDataResults: Array<PokemonTypeDetails>;
  resultsAmount: number;
  baseData: TypeBaseData;
  sorting: TypeSorting;
  currentPage: number;
};

export type TypeContextProps = {
  setCurrentPageResults: (currentPageResults: Array<PokemonTypeDetails>) => void;
  setSearchResults: (searchResults: Array<PokemonTypeDetails> | null) => void;
  setAllDataResults: (allDataResults: Array<PokemonTypeDetails>) => void;
  setResultsAmount: (resultsAmount: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setBaseData: (baseData: TypeBaseData) => void;
  setSorting: (sorting: TypeSorting) => void;
  typeState: TypeContextState;
};

export type TypeAction = {
  type: TypeActionType;
  payload: Partial<TypeContextState>;
};

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

export type MoveBaseData = {
  previous: null | string;
  results: Array<PokemonMove>;
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
