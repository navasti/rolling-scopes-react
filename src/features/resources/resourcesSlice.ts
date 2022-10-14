import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Limits } from 'appConstants';
import {
  fetchParameterizedData,
  fetchAndMapPokemons,
  fetchAndMapMoves,
  fetchCurrentData,
  fetchAndMapTypes,
  fetchAllData,
  sortPokemon,
  isPokemon,
  sortType,
  sortMove,
  isMove,
  isType,
  pokemonSortObject,
  moveSortObject,
  typeSortObject,
} from 'utils';
import {
  ResultsAmountPayload,
  SearchResultsPayload,
  ResultsAmountParams,
  PreviousPagePayload,
  SpecificPagePayload,
  SearchResultsParams,
  PokemonMoveDetails,
  PokemonTypeDetails,
  SortingThunkParams,
  PreviousPageParams,
  SpecificPageParams,
  NextPagePayload,
  NextPageParams,
  SortingPayload,
  PokemonDetails,
  PokemonSorting,
  ResourcesState,
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

export const setParameterizedDataAsync = createAsyncThunk(
  'resources/paramData',
  async (inputValue: string) => {
    const allData = await fetchAllData();
    if (allData) {
      const currentData = await fetchParameterizedData(inputValue, allData);
      if (currentData) return currentData;
    }
  }
);

export const setAllDataAsync = createAsyncThunk('resources/allData', async () => {
  const allData = await fetchAllData();
  if (allData) {
    const currentData = await fetchCurrentData(allData);
    if (currentData) return currentData;
  }
});

export const sortingAsync = createAsyncThunk(
  'resources/sorting',
  async ({ resultsAmount, resourceType }: SortingThunkParams) => {
    if (isPokemon(resourceType)) {
      const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount}`);
      return { data, resourceType };
    }
    if (isMove(resourceType)) {
      const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`);
      return { data, resourceType };
    }
    if (isType(resourceType)) {
      const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount}`);
      return { data, resourceType };
    }
  }
);

export const resultsAmountAsync = createAsyncThunk(
  'resources/resultsAmount',
  async ({ resourceType, resultsAmount }: ResultsAmountParams) => {
    if (isPokemon(resourceType)) {
      const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount}`);
      return { data, resourceType, resultsAmount };
    }
    if (isMove(resourceType)) {
      const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`);
      return { data, resourceType, resultsAmount };
    }
    if (isType(resourceType)) {
      const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount}`);
      return { data, resourceType, resultsAmount };
    }
  }
);

export const nextPageAsync = createAsyncThunk(
  'resources/nextPage',
  async ({ resourceType, next }: NextPageParams) => {
    if (isPokemon(resourceType)) {
      const data = await fetchAndMapPokemons(next);
      return { data, resourceType };
    }
    if (isMove(resourceType)) {
      const data = await fetchAndMapMoves(next);
      return { data, resourceType };
    }
    if (isType(resourceType)) {
      const data = await fetchAndMapTypes(next);
      return { data, resourceType };
    }
  }
);

export const previousPageAsync = createAsyncThunk(
  'resources/previousPage',
  async ({ previous, resourceType }: PreviousPageParams) => {
    if (isPokemon(resourceType)) {
      const data = await fetchAndMapPokemons(previous);
      return { data, resourceType };
    }
    if (isMove(resourceType)) {
      const data = await fetchAndMapMoves(previous);
      return { data, resourceType };
    }
    if (isType(resourceType)) {
      const data = await fetchAndMapTypes(previous);
      return { data, resourceType };
    }
  }
);

export const specificPageAsync = createAsyncThunk(
  'resources/specificPage',
  async ({ page, resourceType, resultsAmount }: SpecificPageParams) => {
    if (isPokemon(resourceType)) {
      const data = await fetchAndMapPokemons(
        `${API.POKEMON}?limit=${resultsAmount}&offset=${page * resultsAmount - resultsAmount}`
      );
      return { data, resourceType, page };
    }
    if (isMove(resourceType)) {
      const data = await fetchAndMapMoves(
        `${API.MOVE}?limit=${resultsAmount}&offset=${page * resultsAmount - resultsAmount}`
      );
      return { data, resourceType, page };
    }
    if (isType(resourceType)) {
      const data = await fetchAndMapTypes(
        `${API.TYPE}?limit=${resultsAmount}&offset=${page * resultsAmount - resultsAmount}`
      );
      return { data, resourceType, page };
    }
  }
);

export const searchResultsAsync = createAsyncThunk(
  'resources/searchResultsAsync',
  async ({ moveResultsAmount, pokemonResultsAmount, typeResultsAmount }: SearchResultsParams) => {
    const pokemons = await fetchAndMapPokemons(`${API.POKEMON}?limit=${pokemonResultsAmount}`);
    const moves = await fetchAndMapMoves(`${API.MOVE}?limit=${moveResultsAmount}`);
    const types = await fetchAndMapTypes(`${API.TYPE}?limit=${typeResultsAmount}`);
    return { pokemons, moves, types, moveResultsAmount, pokemonResultsAmount, typeResultsAmount };
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    sortingSync: (state, action: PayloadAction<SortingPayload>) => {
      const { payload } = action;
      const { resourceType, sorting } = payload;
      if (isPokemon(resourceType)) {
        const pokemons = state.searchPokemonResults?.length
          ? state.searchPokemonResults
          : state.allPokemons;
        const sorted = pokemonSortObject(pokemons)[sorting as PokemonSorting]();
        state.currentPokemons = sorted.slice(0, state.pokemonResultsAmount);
        state.searchPokemonResults = sorted;
        state.pokemonSorting = sorting as PokemonSorting;
        state.currentPokemonPage = 1;
      }
      if (isMove(resourceType)) {
        const moves = state.searchMoveResults?.length ? state.searchMoveResults : state.allMoves;
        const sorted = moveSortObject(moves)[sorting as MoveSorting]();
        state.currentMoves = sorted.slice(0, state.moveResultsAmount);
        state.searchMoveResults = sorted;
        state.moveSorting = sorting as MoveSorting;
        state.currentMovePage = 1;
      }
      if (isType(resourceType)) {
        const types = state.searchTypeResults?.length ? state.searchTypeResults : state.allTypes;
        const sorted = typeSortObject(types)[sorting as TypeSorting]();
        state.currentTypes = sorted.slice(0, state.typeResultsAmount);
        state.searchTypeResults = sorted;
        state.typeSorting = sorting as TypeSorting;
        state.currentTypePage = 1;
      }
    },
    resultsAmountSync: (state, action: PayloadAction<ResultsAmountPayload>) => {
      const { payload } = action;
      const { resourceType, resultsAmount } = payload;
      if (isPokemon(resourceType)) {
        const pokemons = state.searchPokemonResults?.length
          ? state.searchPokemonResults
          : state.allPokemons;
        state.currentPokemons = pokemons.slice(0, resultsAmount);
        state.pokemonResultsAmount = resultsAmount;
        state.currentPokemonPage = 1;
      }
      if (isMove(resourceType)) {
        const moves = state.searchMoveResults?.length ? state.searchMoveResults : state.allMoves;
        state.currentMoves = moves.slice(0, resultsAmount);
        state.moveResultsAmount = resultsAmount;
        state.currentMovePage = 1;
      }
      if (isType(resourceType)) {
        const types = state.searchTypeResults?.length ? state.searchTypeResults : state.allTypes;
        state.currentTypes = types.slice(0, resultsAmount);
        state.typeResultsAmount = resultsAmount;
        state.currentTypePage = 1;
      }
    },
    nextPageSync: (state, action: PayloadAction<NextPagePayload>) => {
      const { payload } = action;
      const { resourceType } = payload;
      if (isPokemon(resourceType)) {
        const pokemons = state.searchPokemonResults?.length
          ? state.searchPokemonResults
          : state.allPokemons;
        const index = state.currentPokemonPage * state.pokemonResultsAmount;
        state.currentPokemons = pokemons.slice(index, index + state.pokemonResultsAmount);
        state.currentPokemonPage += 1;
      }
      if (isMove(resourceType)) {
        const moves = state.searchMoveResults?.length ? state.searchMoveResults : state.allMoves;
        const index = state.currentMovePage * state.moveResultsAmount;
        state.currentMoves = moves.slice(index, index + state.moveResultsAmount);
        state.currentMovePage += 1;
      }
      if (isType(resourceType)) {
        const types = state.searchTypeResults?.length ? state.searchTypeResults : state.allTypes;
        const index = state.currentTypePage * state.typeResultsAmount;
        state.currentTypes = types.slice(index, index + state.typeResultsAmount);
        state.currentTypePage += 1;
      }
    },
    previousPageSync: (state, action: PayloadAction<PreviousPagePayload>) => {
      const { payload } = action;
      const { resourceType } = payload;
      if (isPokemon(resourceType)) {
        const pokemons = state.searchPokemonResults?.length
          ? state.searchPokemonResults
          : state.allPokemons;
        const index = (state.currentPokemonPage - 1) * state.pokemonResultsAmount;
        state.currentPokemons = pokemons.slice(index - state.pokemonResultsAmount, index);
        state.currentPokemonPage -= 1;
      }
      if (isMove(resourceType)) {
        const moves = state.searchMoveResults?.length ? state.searchMoveResults : state.allMoves;
        const index = (state.currentMovePage - 1) * state.moveResultsAmount;
        state.currentMoves = moves.slice(index - state.moveResultsAmount, index);
        state.currentMovePage -= 1;
      }
      if (isType(resourceType)) {
        const types = state.searchTypeResults?.length ? state.searchTypeResults : state.allTypes;
        const index = (state.currentTypePage - 1) * state.typeResultsAmount;
        state.currentTypes = types.slice(index - state.typeResultsAmount, index);
        state.currentTypePage -= 1;
      }
    },
    specificPageSync: (state, action: PayloadAction<SpecificPagePayload>) => {
      const { payload } = action;
      const { page, resourceType } = payload;
      if (isPokemon(resourceType)) {
        const pokemons = state.searchPokemonResults?.length
          ? state.searchPokemonResults
          : state.allPokemons;
        const index = page * state.pokemonResultsAmount;
        state.currentPokemons = pokemons.slice(index - state.pokemonResultsAmount, index);
        state.currentPokemonPage = page;
      }
      if (isMove(resourceType)) {
        const moves = state.searchMoveResults?.length ? state.searchMoveResults : state.allMoves;
        const index = page * state.moveResultsAmount;
        state.currentMoves = moves.slice(index - state.moveResultsAmount, index);
        state.currentMovePage = page;
      }
      if (isType(resourceType)) {
        const types = state.searchTypeResults?.length ? state.searchTypeResults : state.allTypes;
        const index = page * state.typeResultsAmount;
        state.currentTypes = types.slice(index - state.typeResultsAmount, index);
        state.currentTypePage = page;
      }
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
    builder.addCase(setParameterizedDataAsync.pending, (state) => {
      state.status = Status.loading;
    }),
      builder.addCase(setParameterizedDataAsync.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          const { allDataResults, currentPageResults, searchResults } = payload;
          state.currentMoves = currentPageResults.moves;
          state.currentPokemons = currentPageResults.pokemons;
          state.currentTypes = currentPageResults.types;
          state.allPokemons = allDataResults.pokemons;
          state.allMoves = allDataResults.moves;
          state.allTypes = allDataResults.types;
          state.searchPokemonResults = searchResults.pokemons;
          state.searchMoveResults = searchResults.moves;
          state.searchTypeResults = searchResults.types;
        }
        state.status = Status.idle;
      }),
      builder.addCase(setParameterizedDataAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(setAllDataAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(setAllDataAsync.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          const { allDataResults, baseData, currentPageResults } = payload;
          state.currentMoves = currentPageResults.moves;
          state.currentPokemons = currentPageResults.pokemons;
          state.currentTypes = currentPageResults.types;
          state.allPokemons = allDataResults.pokemons;
          state.allMoves = allDataResults.moves;
          state.allTypes = allDataResults.types;
          state.baseMoves = baseData.moves;
          state.basePokemons = baseData.pokemons;
          state.baseTypes = baseData.types;
        }
        state.status = Status.idle;
      }),
      builder.addCase(setAllDataAsync.rejected, (state) => {
        state.status = Status.failed;
      });
    builder.addCase(sortingAsync.pending, (state) => {
      state.status = Status.loading;
    }),
      builder.addCase(sortingAsync.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          const { data, resourceType } = payload;
          const mapped = data?.mapped || [];
          const base = data?.base || null;
          if (isPokemon(resourceType)) {
            state.currentPokemons = mapped as Array<PokemonDetails>;
            state.pokemonSorting = PokemonSorting.none;
            state.currentPokemonPage = 1;
            state.basePokemons = base;
          }
          if (isMove(resourceType)) {
            state.currentMoves = mapped as Array<PokemonMoveDetails>;
            state.moveSorting = MoveSorting.none;
            state.currentMovePage = 1;
            state.baseMoves = base;
          }
          if (isType(resourceType)) {
            state.currentTypes = mapped as Array<PokemonTypeDetails>;
            state.typeSorting = TypeSorting.none;
            state.currentTypePage = 1;
            state.baseTypes = base;
          }
        }
        state.status = Status.idle;
      }),
      builder.addCase(sortingAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(resultsAmountAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(resultsAmountAsync.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          const { data, resourceType, resultsAmount } = payload;
          const mapped = data?.mapped || [];
          const base = data?.base || null;
          if (isPokemon(resourceType)) {
            state.currentPokemons = mapped as Array<PokemonDetails>;
            state.pokemonResultsAmount = resultsAmount;
            state.currentPokemonPage = 1;
            state.basePokemons = base;
          }
          if (isMove(resourceType)) {
            state.currentMoves = mapped as Array<PokemonMoveDetails>;
            state.moveResultsAmount = resultsAmount;
            state.currentMovePage = 1;
            state.baseMoves = base;
          }
          if (isType(resourceType)) {
            state.currentTypes = mapped as Array<PokemonTypeDetails>;
            state.typeResultsAmount = resultsAmount;
            state.currentTypePage = 1;
            state.baseTypes = base;
          }
        }
        state.status = Status.idle;
      }),
      builder.addCase(resultsAmountAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(nextPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(nextPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          const { data, resourceType } = payload;
          const mapped = data?.mapped || [];
          const base = data?.base || null;
          if (isPokemon(resourceType)) {
            state.currentPokemons = mapped as Array<PokemonDetails>;
            state.currentPokemonPage += 1;
            state.basePokemons = base;
          }
          if (isMove(resourceType)) {
            state.currentMoves = mapped as Array<PokemonMoveDetails>;
            state.currentMovePage += 1;
            state.baseMoves = base;
          }
          if (isType(resourceType)) {
            state.currentTypes = mapped as Array<PokemonTypeDetails>;
            state.currentTypePage += 1;
            state.baseTypes = base;
          }
        }
        state.status = Status.idle;
      }),
      builder.addCase(nextPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(previousPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(previousPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          const { data, resourceType } = payload;
          const mapped = data?.mapped || [];
          const base = data?.base || null;
          if (isPokemon(resourceType)) {
            state.currentPokemons = mapped as Array<PokemonDetails>;
            state.currentPokemonPage -= 1;
            state.basePokemons = base;
          }
          if (isMove(resourceType)) {
            state.currentMoves = mapped as Array<PokemonMoveDetails>;
            state.currentMovePage -= 1;
            state.baseMoves = base;
          }
          if (isType(resourceType)) {
            state.currentTypes = mapped as Array<PokemonTypeDetails>;
            state.currentTypePage -= 1;
            state.baseTypes = base;
          }
        }
        state.status = Status.idle;
      }),
      builder.addCase(previousPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(specificPageAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(specificPageAsync.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          const { data, resourceType, page } = payload;
          const mapped = data?.mapped || [];
          const base = data?.base || null;
          if (isPokemon(resourceType)) {
            state.currentPokemons = mapped as Array<PokemonDetails>;
            state.currentPokemonPage = page;
            state.basePokemons = base;
          }
          if (isMove(resourceType)) {
            state.currentMoves = mapped as Array<PokemonMoveDetails>;
            state.currentMovePage = page;
            state.baseMoves = base;
          }
          if (isType(resourceType)) {
            state.currentTypes = mapped as Array<PokemonTypeDetails>;
            state.currentTypePage = page;
            state.baseTypes = base;
          }
        }
        state.status = Status.idle;
      }),
      builder.addCase(specificPageAsync.rejected, (state) => {
        state.status = Status.failed;
      }),
      builder.addCase(searchResultsAsync.pending, (state) => {
        state.status = Status.loading;
      }),
      builder.addCase(searchResultsAsync.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          const {
            types,
            moves,
            pokemons,
            moveResultsAmount,
            typeResultsAmount,
            pokemonResultsAmount,
          } = payload;
          state.currentPokemons = (pokemons?.mapped || []).slice(0, pokemonResultsAmount);
          state.currentMoves = (moves?.mapped || []).slice(0, moveResultsAmount);
          state.currentTypes = (types?.mapped || []).slice(0, typeResultsAmount);
          state.basePokemons = pokemons?.base || null;
          state.pokemonSorting = PokemonSorting.none;
          state.moveSorting = MoveSorting.none;
          state.typeSorting = TypeSorting.none;
          state.baseMoves = moves?.base || null;
          state.baseTypes = types?.base || null;
          state.searchPokemonResults = null;
          state.searchMoveResults = null;
          state.searchTypeResults = null;
          state.currentPokemonPage = 1;
          state.currentMovePage = 1;
          state.currentTypePage = 1;
        }
        state.status = Status.idle;
      }),
      builder.addCase(searchResultsAsync.rejected, (state) => {
        state.status = Status.failed;
      });
  },
});

const { actions, reducer } = resourcesSlice;
export const {
  searchResultsSync,
  resultsAmountSync,
  previousPageSync,
  specificPageSync,
  nextPageSync,
  sortingSync,
} = actions;
export default reducer;
