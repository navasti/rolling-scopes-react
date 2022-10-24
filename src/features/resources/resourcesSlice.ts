import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Limits } from 'appConstants';
import {
  fetchParameterizedData,
  fetchAndMapPokemons,
  fetchAndMapMoves,
  fetchCurrentData,
  fetchAndMapTypes,
  pokemonSortObject,
  moveSortObject,
  typeSortObject,
  sortPokemon,
  sortType,
  sortMove,
} from 'utils';
import {
  PokemonSpeficicPagePayload,
  PokemonSpecificPageThunk,
  MoveSpeficicPagePayload,
  TypeSpeficicPagePayload,
  MoveSpecificPageThunk,
  PokemonSortingPayload,
  PokemonResultsPayload,
  TypeSpecificPageThunk,
  SearchResultsPayload,
  SearchResultsParams,
  PokemonResultsThunk,
  ScpecificPageParams,
  PokemonMoveDetails,
  SearchResultsThunk,
  PokemonTypeDetails,
  MoveSortingPayload,
  TypeSortingPayload,
  MoveResultsPayload,
  TypeResultsPayload,
  CurrentDataThunk,
  MoveResultsThunk,
  TypeResultsThunk,
  PokemonDetails,
  MappedPokemons,
  PokemonSorting,
  ResourcesState,
  AllDataThunk,
  MappedMoves,
  MappedTypes,
  MoveSorting,
  TypeSorting,
  Status,
} from 'types';

export const initialState: ResourcesState = {
  status: Status.idle,

  // sorting
  pokemonSorting: PokemonSorting.none,
  moveSorting: MoveSorting.none,
  typeSorting: TypeSorting.none,

  // amount of displayed results
  pokemonResultsAmount: Limits.pokemon,
  moveResultsAmount: Limits.move,
  typeResultsAmount: Limits.type,

  // current page's data
  currentPokemons: [],
  currentMoves: [],
  currentTypes: [],

  // searched data
  searchPokemonResults: null,
  searchMoveResults: null,
  searchTypeResults: null,

  // all the data
  allPokemons: [],
  allMoves: [],
  allTypes: [],

  // base data
  basePokemons: null,
  baseMoves: null,
  baseTypes: null,

  // current pages
  currentPokemonPage: 1,
  currentMovePage: 1,
  currentTypePage: 1,
};

export const parameterizedDataAsync = createAsyncThunk(
  'resources/paramData',
  async (inputValue: string, thunkApi) => {
    try {
      const currentData = await fetchParameterizedData(inputValue);
      return currentData as CurrentDataThunk;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'paramData fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const allDataAsync = createAsyncThunk('resources/allData', async (_, thunkApi) => {
  try {
    const currentData = await fetchCurrentData();
    return currentData as AllDataThunk;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'allData fetch fail';
    return thunkApi.rejectWithValue(msg);
  }
});

export const pokemonSortingAsync = createAsyncThunk(
  'resources/pokemonSorting',
  async (resultsAmount: number, thunkApi) => {
    try {
      const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount}`);
      return data as MappedPokemons;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'parametrized data fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const moveSortingAsync = createAsyncThunk(
  'resources/moveSorting',
  async (resultsAmount: number, thunkApi) => {
    try {
      const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`);
      return data as MappedMoves;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'moveSorting fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const typeSortingAsync = createAsyncThunk(
  'resources/typeSorting',
  async (resultsAmount: number, thunkApi) => {
    try {
      const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount}`);
      return data as MappedTypes;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'parametrized data fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const pokemonResultsAmountAsync = createAsyncThunk(
  'resources/pokemonResultsAmount',
  async (resultsAmount: number, thunkApi) => {
    try {
      const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount}`);
      return { data, resultsAmount } as PokemonResultsThunk;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'pokemonResultsAmount fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const moveResultsAmountAsync = createAsyncThunk(
  'resources/moveResultsAmount',
  async (resultsAmount: number, thunkApi) => {
    try {
      const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`);
      return { data, resultsAmount } as MoveResultsThunk;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'moveResultsAmount fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const typeResultsAmountAsync = createAsyncThunk(
  'resources/typeResultsAmount',
  async (resultsAmount: number, thunkApi) => {
    try {
      const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount}`);
      return { data, resultsAmount } as TypeResultsThunk;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'typeResultsAmount fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const pokemonNextPageAsync = createAsyncThunk(
  'resources/pokemonNextPage',
  async (next: string, thunkApi) => {
    try {
      const data = await fetchAndMapPokemons(next);
      return data as MappedPokemons;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'pokemonNextPage fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const moveNextPageAsync = createAsyncThunk(
  'resources/moveNextPage',
  async (next: string, thunkApi) => {
    try {
      const data = await fetchAndMapMoves(next);
      return data as MappedMoves;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'moveNextPage fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const typeNextPageAsync = createAsyncThunk(
  'resources/typeNextPage',
  async (next: string, thunkApi) => {
    try {
      const data = await fetchAndMapTypes(next);
      return data as MappedTypes;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'typeNextPage fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const pokemonPreviousPageAsync = createAsyncThunk(
  'resources/pokemonPreviousPage',
  async (prev: string, thunkApi) => {
    try {
      const data = await fetchAndMapPokemons(prev);
      return data as MappedPokemons;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'pokemonPreviousPage fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const movePreviousPageAsync = createAsyncThunk(
  'resources/movePreviousPage',
  async (prev: string, thunkApi) => {
    try {
      const data = await fetchAndMapMoves(prev);
      return data as MappedMoves;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'movePreviousPage fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const typePreviousPageAsync = createAsyncThunk(
  'resources/typePreviousPage',
  async (prev: string, thunkApi) => {
    try {
      const data = await fetchAndMapTypes(prev);
      return data as MappedTypes;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'typePreviousPage fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const pokemonSpecificPageAsync = createAsyncThunk(
  'resources/pokemonSpecificPage',
  async ({ resultsAmount, page }: ScpecificPageParams, thunkApi) => {
    try {
      const data = await fetchAndMapPokemons(
        `${API.POKEMON}?limit=${resultsAmount}&offset=${page * resultsAmount - resultsAmount}`
      );
      return { data, page } as PokemonSpecificPageThunk;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'pokemonSpecificPage fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const moveSpecificPageAsync = createAsyncThunk(
  'resources/moveSpecificPage',
  async ({ resultsAmount, page }: ScpecificPageParams, thunkApi) => {
    try {
      const data = await fetchAndMapMoves(
        `${API.MOVE}?limit=${resultsAmount}&offset=${page * resultsAmount - resultsAmount}`
      );
      return { data, page } as MoveSpecificPageThunk;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'moveSpecificPage fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const typeSpecificPageAsync = createAsyncThunk(
  'resources/typeSpecificPage',
  async ({ resultsAmount, page }: ScpecificPageParams, thunkApi) => {
    try {
      const data = await fetchAndMapTypes(
        `${API.TYPE}?limit=${resultsAmount}&offset=${page * resultsAmount - resultsAmount}`
      );
      return { data, page } as TypeSpecificPageThunk;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'typeSpecificPage fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const searchResultsAsync = createAsyncThunk(
  'resources/searchResultsAsync',
  async (params: SearchResultsParams, thunkApi) => {
    try {
      const { moveResultsAmount, pokemonResultsAmount, typeResultsAmount } = params;
      const moves = await fetchAndMapMoves(`${API.MOVE}?limit=${moveResultsAmount}`);
      const types = await fetchAndMapTypes(`${API.TYPE}?limit=${typeResultsAmount}`);
      const pokemons = await fetchAndMapPokemons(`${API.POKEMON}?limit=${pokemonResultsAmount}`);
      return {
        moves,
        types,
        pokemons,
        typeResultsAmount,
        moveResultsAmount,
        pokemonResultsAmount,
      } as SearchResultsThunk;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'searchResultsAsync fetch fail';
      return thunkApi.rejectWithValue(msg);
    }
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    pokemonSortingSync: (state, action: PayloadAction<PokemonSortingPayload>) => {
      const { payload } = action;
      const { pokemons, sorting } = payload;
      const sorted = pokemonSortObject(pokemons)[sorting]();
      state.currentPokemons = sorted.slice(0, state.pokemonResultsAmount);
      state.searchPokemonResults = sorted;
      state.pokemonSorting = sorting;
      state.currentPokemonPage = 1;
    },
    moveSortingSync: (state, action: PayloadAction<MoveSortingPayload>) => {
      const { payload } = action;
      const { moves, sorting } = payload;
      const sorted = moveSortObject(moves)[sorting as MoveSorting]();
      state.currentMoves = sorted.slice(0, state.moveResultsAmount);
      state.searchMoveResults = sorted;
      state.moveSorting = sorting;
      state.currentMovePage = 1;
    },
    typeSortingSync: (state, action: PayloadAction<TypeSortingPayload>) => {
      const { payload } = action;
      const { sorting, types } = payload;
      const sorted = typeSortObject(types)[sorting as TypeSorting]();
      state.currentTypes = sorted.slice(0, state.typeResultsAmount);
      state.searchTypeResults = sorted;
      state.typeSorting = sorting;
      state.currentTypePage = 1;
    },
    pokemonResultsAmountSync: (state, action: PayloadAction<PokemonResultsPayload>) => {
      const { payload } = action;
      const { pokemons, resultsAmount } = payload;
      state.currentPokemons = pokemons.slice(0, resultsAmount);
      state.pokemonResultsAmount = resultsAmount;
      state.currentPokemonPage = 1;
    },
    moveResultsAmountSync: (state, action: PayloadAction<MoveResultsPayload>) => {
      const { payload } = action;
      const { moves, resultsAmount } = payload;
      state.currentMoves = moves.slice(0, resultsAmount);
      state.moveResultsAmount = resultsAmount;
      state.currentMovePage = 1;
    },
    typeResultsAmountSync: (state, action: PayloadAction<TypeResultsPayload>) => {
      const { payload } = action;
      const { types, resultsAmount } = payload;
      state.currentTypes = types.slice(0, resultsAmount);
      state.typeResultsAmount = resultsAmount;
      state.currentTypePage = 1;
    },
    pokemonNextPageSync: (state, action: PayloadAction<Array<PokemonDetails>>) => {
      const { payload } = action;
      const index = state.currentPokemonPage * state.pokemonResultsAmount;
      state.currentPokemons = payload.slice(index, index + state.pokemonResultsAmount);
      state.currentPokemonPage += 1;
    },
    moveNextPageSync: (state, action: PayloadAction<Array<PokemonMoveDetails>>) => {
      const { payload } = action;
      const index = state.currentMovePage * state.moveResultsAmount;
      state.currentMoves = payload.slice(index, index + state.moveResultsAmount);
      state.currentMovePage += 1;
    },
    typeNextPageSync: (state, action: PayloadAction<Array<PokemonTypeDetails>>) => {
      const { payload } = action;
      const index = state.currentTypePage * state.typeResultsAmount;
      state.currentTypes = payload.slice(index, index + state.typeResultsAmount);
      state.currentTypePage += 1;
    },
    pokemonPreviousPageSync: (state, action: PayloadAction<Array<PokemonDetails>>) => {
      const { payload } = action;
      const index = (state.currentPokemonPage - 1) * state.pokemonResultsAmount;
      state.currentPokemons = payload.slice(index - state.pokemonResultsAmount, index);
      state.currentPokemonPage -= 1;
    },
    movePreviousPageSync: (state, action: PayloadAction<Array<PokemonMoveDetails>>) => {
      const { payload } = action;
      const index = (state.currentMovePage - 1) * state.moveResultsAmount;
      state.currentMoves = payload.slice(index - state.moveResultsAmount, index);
      state.currentMovePage -= 1;
    },
    typePreviousPageSync: (state, action: PayloadAction<Array<PokemonTypeDetails>>) => {
      const { payload } = action;
      const index = (state.currentTypePage - 1) * state.typeResultsAmount;
      state.currentTypes = payload.slice(index - state.typeResultsAmount, index);
      state.currentTypePage -= 1;
    },
    pokemonSpecificPageSync: (state, action: PayloadAction<PokemonSpeficicPagePayload>) => {
      const { payload } = action;
      const { page, pokemons } = payload;
      const index = page * state.pokemonResultsAmount;
      state.currentPokemons = pokemons.slice(index - state.pokemonResultsAmount, index);
      state.currentPokemonPage = page;
    },
    moveSpecificPageSync: (state, action: PayloadAction<MoveSpeficicPagePayload>) => {
      const { payload } = action;
      const { page, moves } = payload;
      const index = page * state.moveResultsAmount;
      state.currentMoves = moves.slice(index - state.moveResultsAmount, index);
      state.currentMovePage = page;
    },
    typeSpecificPageSync: (state, action: PayloadAction<TypeSpeficicPagePayload>) => {
      const { payload } = action;
      const { page, types } = payload;
      const index = page * state.typeResultsAmount;
      state.currentTypes = types.slice(index - state.typeResultsAmount, index);
      state.currentTypePage = page;
    },
    searchResultsSync: (state, action: PayloadAction<SearchResultsPayload>) => {
      const { payload } = action;
      const { inputValue } = payload;
      const searchedTypes = sortType(state.allTypes)
        .byId()
        .filter((item) => item.name.includes(inputValue));
      const searchedPokemons = sortPokemon(state.allPokemons)
        .byId()
        .filter((item) => item.name.includes(inputValue));
      const searchedMoves = sortMove(state.allMoves)
        .byId()
        .filter((item) => item.name.includes(inputValue));
      state.currentPokemons = searchedPokemons.slice(0, state.pokemonResultsAmount);
      state.currentMoves = searchedMoves.slice(0, state.moveResultsAmount);
      state.currentTypes = searchedTypes.slice(0, state.typeResultsAmount);
      state.searchPokemonResults = searchedPokemons;
      state.searchMoveResults = searchedMoves;
      state.searchTypeResults = searchedTypes;
      state.pokemonSorting = PokemonSorting.none;
      state.moveSorting = MoveSorting.none;
      state.typeSorting = TypeSorting.none;
      state.currentPokemonPage = 1;
      state.currentMovePage = 1;
      state.currentTypePage = 1;
    },
  },
  extraReducers: (builder) => {
    // Pending
    builder.addCase(parameterizedDataAsync.pending, (state) => {
      state.status = Status.loading;
    }),
      builder.addCase(allDataAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(searchResultsAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(pokemonPreviousPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(movePreviousPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(typePreviousPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(pokemonSpecificPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(moveSpecificPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(typeSpecificPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(pokemonSortingAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(moveSortingAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(typeSortingAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(pokemonResultsAmountAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(moveResultsAmountAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(typeResultsAmountAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(pokemonNextPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(moveNextPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(typeNextPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      // Rejected
      builder.addCase(searchResultsAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(allDataAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(parameterizedDataAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(pokemonPreviousPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(movePreviousPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(typePreviousPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(pokemonSpecificPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(moveSpecificPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(typeSpecificPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(pokemonSortingAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(moveSortingAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(typeSortingAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(pokemonResultsAmountAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(moveResultsAmountAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(typeResultsAmountAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(pokemonNextPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(moveNextPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(typeNextPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      // Fulfilled
      builder.addCase(searchResultsAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const {
          types,
          moves,
          pokemons,
          moveResultsAmount,
          typeResultsAmount,
          pokemonResultsAmount,
        } = payload;
        state.currentPokemons = pokemons.mapped.slice(0, pokemonResultsAmount);
        state.currentMoves = moves.mapped.slice(0, moveResultsAmount);
        state.currentTypes = types.mapped.slice(0, typeResultsAmount);
        state.pokemonSorting = PokemonSorting.none;
        state.moveSorting = MoveSorting.none;
        state.typeSorting = TypeSorting.none;
        state.basePokemons = pokemons.base;
        state.baseMoves = moves.base;
        state.baseTypes = types.base;
        state.searchPokemonResults = null;
        state.searchMoveResults = null;
        state.searchTypeResults = null;
        state.currentPokemonPage = 1;
        state.currentMovePage = 1;
        state.currentTypePage = 1;
        state.status = Status.idle;
      }),
      builder.addCase(pokemonPreviousPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { base, mapped } = payload;
        state.basePokemons = base;
        state.status = Status.idle;
        state.currentPokemonPage -= 1;
        state.currentPokemons = mapped;
      }),
      builder.addCase(movePreviousPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { base, mapped } = payload;
        state.baseMoves = base;
        state.status = Status.idle;
        state.currentMovePage -= 1;
        state.currentMoves = mapped;
      }),
      builder.addCase(typePreviousPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { base, mapped } = payload;
        state.baseTypes = base;
        state.status = Status.idle;
        state.currentTypePage -= 1;
        state.currentTypes = mapped;
      }),
      builder.addCase(pokemonSpecificPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { data, page } = payload;
        state.status = Status.idle;
        state.basePokemons = data.base;
        state.currentPokemonPage = page;
        state.currentPokemons = data.mapped;
      }),
      builder.addCase(moveSpecificPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { data, page } = payload;
        state.status = Status.idle;
        state.baseMoves = data.base;
        state.currentMovePage = page;
        state.currentMoves = data.mapped;
      }),
      builder.addCase(typeSpecificPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { data, page } = payload;
        state.status = Status.idle;
        state.currentTypePage = page;
        state.baseTypes = data.base;
        state.currentTypes = data.mapped;
      }),
      builder.addCase(pokemonNextPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { base, mapped } = payload;
        state.basePokemons = base;
        state.status = Status.idle;
        state.currentPokemonPage += 1;
        state.currentPokemons = mapped;
      }),
      builder.addCase(moveNextPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { base, mapped } = payload;
        state.baseMoves = base;
        state.status = Status.idle;
        state.currentMovePage += 1;
        state.currentMoves = mapped;
      }),
      builder.addCase(typeNextPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { base, mapped } = payload;
        state.baseTypes = base;
        state.status = Status.idle;
        state.currentTypePage += 1;
        state.currentTypes = mapped;
      }),
      builder.addCase(pokemonSortingAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { base, mapped } = payload;
        state.basePokemons = base;
        state.status = Status.idle;
        state.currentPokemonPage = 1;
        state.currentPokemons = mapped;
        state.pokemonSorting = PokemonSorting.none;
      }),
      builder.addCase(moveSortingAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { base, mapped } = payload;
        state.baseMoves = base;
        state.currentMovePage = 1;
        state.status = Status.idle;
        state.currentMoves = mapped;
        state.moveSorting = MoveSorting.none;
      }),
      builder.addCase(typeSortingAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { base, mapped } = payload;
        state.baseTypes = base;
        state.currentTypePage = 1;
        state.status = Status.idle;
        state.currentTypes = mapped;
        state.typeSorting = TypeSorting.none;
      }),
      builder.addCase(parameterizedDataAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { allDataResults, currentPageResults, searchResults } = payload;
        state.searchPokemonResults = searchResults.pokemons;
        state.currentPokemons = currentPageResults.pokemons;
        state.currentTypes = currentPageResults.types;
        state.currentMoves = currentPageResults.moves;
        state.searchMoveResults = searchResults.moves;
        state.searchTypeResults = searchResults.types;
        state.allPokemons = allDataResults.pokemons;
        state.allMoves = allDataResults.moves;
        state.allTypes = allDataResults.types;
        state.status = Status.idle;
      }),
      builder.addCase(allDataAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { allDataResults, baseData, currentPageResults } = payload;
        state.status = Status.idle;
        state.baseMoves = baseData.moves;
        state.baseTypes = baseData.types;
        state.allMoves = allDataResults.moves;
        state.allTypes = allDataResults.types;
        state.basePokemons = baseData.pokemons;
        state.allPokemons = allDataResults.pokemons;
        state.currentMoves = currentPageResults.moves;
        state.currentTypes = currentPageResults.types;
        state.currentPokemons = currentPageResults.pokemons;
      }),
      builder.addCase(pokemonResultsAmountAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { data, resultsAmount } = payload;
        state.pokemonResultsAmount = resultsAmount;
        state.currentPokemons = data.mapped;
        state.basePokemons = data.base;
        state.currentPokemonPage = 1;
        state.status = Status.idle;
      }),
      builder.addCase(moveResultsAmountAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { data, resultsAmount } = payload;
        state.moveResultsAmount = resultsAmount;
        state.currentMoves = data.mapped;
        state.baseMoves = data.base;
        state.status = Status.idle;
        state.currentMovePage = 1;
      }),
      builder.addCase(typeResultsAmountAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { data, resultsAmount } = payload;
        state.typeResultsAmount = resultsAmount;
        state.currentTypes = data.mapped;
        state.baseTypes = data.base;
        state.status = Status.idle;
        state.currentTypePage = 1;
      });
  },
});

const { actions, reducer } = resourcesSlice;
export const {
  pokemonResultsAmountSync,
  pokemonPreviousPageSync,
  pokemonSpecificPageSync,
  moveResultsAmountSync,
  typeResultsAmountSync,
  moveSpecificPageSync,
  movePreviousPageSync,
  typeSpecificPageSync,
  typePreviousPageSync,
  pokemonNextPageSync,
  pokemonSortingSync,
  searchResultsSync,
  moveNextPageSync,
  typeNextPageSync,
  moveSortingSync,
  typeSortingSync,
} = actions;
export default reducer;
