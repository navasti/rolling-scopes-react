import { useGlobalData } from './useGlobalData';
import { useAppContext } from 'contexts';
import { API } from 'appConstants';
import { MouseEvent } from 'react';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonDetails,
  PokemonSorting,
  PayloadTypes,
  TypeSorting,
  MoveSorting,
} from 'types';
import {
  fetchAndMapPokemons,
  fetchAndMapMoves,
  fetchAndMapTypes,
  handleCatch,
  sortPokemon,
  sortMove,
  sortType,
} from 'utils';

export const useResources = (resourceType: 'pokemons' | 'moves' | 'types') => {
  const {
    state: { allDataResults, resultsAmount, searchResults, baseData, currentPage },
    setIsLoading,
    dispatch,
  } = useAppContext();

  const { shouldFetchSearch } = useGlobalData();

  const isPokemon = resourceType === 'pokemons';
  const isMove = resourceType === 'moves';
  const isType = resourceType === 'types';

  const moves = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
  const types = searchResults.types?.length ? searchResults.types : allDataResults.types;
  const pokemons = searchResults.pokemons?.length
    ? searchResults.pokemons
    : allDataResults.pokemons;

  const sort = (sorting: MoveSorting | PokemonSorting | TypeSorting) => {
    const moveSortObject = {
      [MoveSorting.alphabetical]: sortMove(moves).alphabetical,
      [MoveSorting.accuracy]: sortMove(moves).byAccuracy,
      [MoveSorting.power]: sortMove(moves).byPower,
      [MoveSorting.none]: sortMove(moves).byId,
      [MoveSorting.pp]: sortMove(moves).byPP,
    };
    const pokemonSortObject = {
      [PokemonSorting.baseExperience]: sortPokemon(pokemons).byBaseExperience,
      [PokemonSorting.alphabetical]: sortPokemon(pokemons).alphabetical,
      [PokemonSorting.weight]: sortPokemon(pokemons).byWeight,
      [PokemonSorting.height]: sortPokemon(pokemons).byHeight,
      [PokemonSorting.none]: sortPokemon(pokemons).byId,
    };
    const typeSortObject = {
      [TypeSorting.pokemonsAmount]: sortType(types).byPokemonsAmount,
      [TypeSorting.alphabetical]: sortType(types).alphabetical,
      [TypeSorting.movesAmount]: sortType(types).byMovesAmount,
      [TypeSorting.none]: sortType(types).byId,
    };
    if (isPokemon) return pokemonSortObject[sorting as PokemonSorting]();
    if (isMove) return moveSortObject[sorting as MoveSorting]();
    if (isType) return typeSortObject[sorting as TypeSorting]();
  };

  const handleSorting = async (sorting: PokemonSorting | MoveSorting | TypeSorting) => {
    setIsLoading(true);
    if (isPokemon) {
      if (sorting === PokemonSorting.none && !searchResults.pokemons) {
        const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount.pokemons}`);
        dispatch({
          type: PayloadTypes.sortingPokemon,
          payload: {
            currentPokemons: data?.mapped || [],
            basePokemons: data?.base,
            currentPage: 1,
            sorting,
          },
        });
      } else {
        const sorted = sort(sorting) as PokemonDetails[];
        const currentPokemons = sorted?.slice(0, resultsAmount.pokemons);
        dispatch({
          type: PayloadTypes.sortingPokemon,
          payload: {
            sorting: sorting as PokemonSorting,
            searchResults: sorted,
            currentPokemons,
            currentPage: 1,
          },
        });
      }
    }
    if (isMove) {
      if (sorting === MoveSorting.none && !searchResults.moves?.length) {
        try {
          const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount.moves}`);
          dispatch({
            type: PayloadTypes.sortingMove,
            payload: {
              currentMoves: data?.mapped || [],
              baseMoves: data?.base,
              currentPage: 1,
              sorting,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        const sorted = sort(sorting as MoveSorting) as PokemonMoveDetails[];
        const currentMoves = sorted?.slice(0, resultsAmount.moves);
        dispatch({
          type: PayloadTypes.sortingMove,
          payload: {
            sorting: sorting as MoveSorting,
            searchResults: sorted,
            currentPage: 1,
            currentMoves,
          },
        });
      }
    }
    if (isType) {
      if (sorting === TypeSorting.none && !searchResults.types?.length) {
        const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount.types}`);
        dispatch({
          type: PayloadTypes.sortingType,
          payload: {
            currentTypes: data?.mapped || [],
            baseTypes: data?.base,
            currentPage: 1,
            sorting,
          },
        });
      } else {
        const sorted = sort(sorting as TypeSorting) as PokemonTypeDetails[];
        const currentTypes = sorted?.slice(0, resultsAmount.types);
        dispatch({
          type: PayloadTypes.sortingType,
          payload: {
            sorting: sorting as TypeSorting,
            searchResults: sorted,
            currentPage: 1,
            currentTypes,
          },
        });
      }
    }
    setIsLoading(false);
  };

  const handleResultsAmount = async (resultsAmount: number) => {
    setIsLoading(true);
    if (isPokemon) {
      if (shouldFetchSearch.pokemons) {
        try {
          const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount}`);
          dispatch({
            type: PayloadTypes.pokemonResults,
            payload: {
              currentPokemons: data?.mapped || [],
              basePokemons: data?.base,
              currentPage: 1,
              resultsAmount,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        dispatch({
          type: PayloadTypes.pokemonResults,
          payload: {
            currentPokemons: pokemons.slice(0, resultsAmount),
            resultsAmount,
            currentPage: 1,
          },
        });
      }
    }
    if (isMove) {
      if (shouldFetchSearch.moves) {
        try {
          const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`);
          dispatch({
            type: PayloadTypes.moveResults,
            payload: {
              baseMoves: data?.base,
              currentPage: 1,
              currentMoves: data?.mapped || [],
              resultsAmount,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        dispatch({
          type: PayloadTypes.moveResults,
          payload: {
            resultsAmount,
            currentPage: 1,
            currentMoves: moves.slice(0, resultsAmount),
          },
        });
      }
    }
    if (isType) {
      if (shouldFetchSearch.types) {
        try {
          const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount}`);
          dispatch({
            type: PayloadTypes.typeResults,
            payload: {
              currentTypes: data?.mapped || [],
              baseTypes: data?.base,
              currentPage: 1,
              resultsAmount,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        dispatch({
          type: PayloadTypes.typeResults,
          payload: {
            currentTypes: types.slice(0, resultsAmount),
            currentPage: 1,
            resultsAmount,
          },
        });
      }
    }
    setIsLoading(false);
  };

  const nextPage = async () => {
    setIsLoading(true);
    if (isPokemon) {
      if (shouldFetchSearch.pokemons && baseData.pokemons?.next) {
        try {
          const data = await fetchAndMapPokemons(baseData.pokemons.next);
          dispatch({
            type: PayloadTypes.pokemonsPagination,
            payload: {
              basePokemons: data?.base,
              currentPokemons: data?.mapped || [],
              currentPage: currentPage.pokemons + 1,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        const index = currentPage.pokemons * resultsAmount.pokemons;
        dispatch({
          type: PayloadTypes.pokemonsPagination,
          payload: {
            currentPokemons: pokemons.slice(index, index + resultsAmount.pokemons),
            currentPage: currentPage.pokemons + 1,
          },
        });
      }
    }
    if (isMove) {
      if (shouldFetchSearch.moves && baseData.moves?.next) {
        try {
          const data = await fetchAndMapMoves(baseData.moves.next);
          dispatch({
            type: PayloadTypes.movesPagination,
            payload: {
              baseMoves: data?.base,
              currentMoves: data?.mapped || [],
              currentPage: currentPage.moves + 1,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        const index = currentPage.moves * resultsAmount.moves;
        dispatch({
          type: PayloadTypes.movesPagination,
          payload: {
            currentMoves: moves.slice(index, index + resultsAmount.moves),
            currentPage: currentPage.moves + 1,
          },
        });
      }
    }
    if (isType) {
      if (shouldFetchSearch.types && baseData.types?.next) {
        try {
          const data = await fetchAndMapTypes(baseData.types.next);
          dispatch({
            type: PayloadTypes.typesPagination,
            payload: {
              currentTypes: data?.mapped || [],
              currentPage: currentPage.types,
              baseTypes: data?.base,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        const index = currentPage.types * resultsAmount.types;
        dispatch({
          type: PayloadTypes.typesPagination,
          payload: {
            currentTypes: types.slice(index, index + resultsAmount.types),
            currentPage: currentPage.types + 1,
          },
        });
      }
    }
    setIsLoading(false);
  };

  const previousPage = async () => {
    setIsLoading(true);
    if (isPokemon) {
      if (shouldFetchSearch.pokemons && baseData.pokemons?.previous) {
        try {
          const data = await fetchAndMapPokemons(baseData.pokemons.previous);
          dispatch({
            type: PayloadTypes.pokemonsPagination,
            payload: {
              basePokemons: data?.base,
              currentPokemons: data?.mapped || [],
              currentPage: currentPage.pokemons - 1,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        const index = (currentPage.pokemons - 1) * resultsAmount.pokemons;
        dispatch({
          type: PayloadTypes.pokemonsPagination,
          payload: {
            currentPokemons: pokemons.slice(index - resultsAmount.pokemons, index),
            currentPage: currentPage.pokemons - 1,
          },
        });
      }
    }
    if (isMove) {
      if (shouldFetchSearch.moves && baseData.moves?.previous) {
        try {
          const data = await fetchAndMapMoves(baseData.moves.previous);
          dispatch({
            type: PayloadTypes.movesPagination,
            payload: {
              baseMoves: data?.base,
              currentMoves: data?.mapped || [],
              currentPage: currentPage.moves - 1,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        const index = (currentPage.moves - 1) * resultsAmount.moves;
        dispatch({
          type: PayloadTypes.movesPagination,
          payload: {
            currentMoves: moves.slice(index - resultsAmount.moves, index),
            currentPage: currentPage.moves - 1,
          },
        });
      }
    }
    if (isType) {
      if (shouldFetchSearch.types && baseData.types?.previous) {
        try {
          const data = await fetchAndMapTypes(baseData.types.previous);
          dispatch({
            type: PayloadTypes.typesPagination,
            payload: {
              baseTypes: data?.base,
              currentTypes: data?.mapped || [],
              currentPage: currentPage.types - 1,
            },
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        const index = (currentPage.types - 1) * resultsAmount.types;
        dispatch({
          type: PayloadTypes.typesPagination,
          payload: {
            currentTypes: types.slice(index - resultsAmount.types, index),
            currentPage: currentPage.types - 1,
          },
        });
      }
    }
    setIsLoading(false);
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    const page = Number(event.currentTarget.textContent);
    if (page != NaN) {
      if (isPokemon) {
        if (shouldFetchSearch.pokemons) {
          try {
            const data = await fetchAndMapPokemons(
              `${API.POKEMON}?limit=${resultsAmount.pokemons}&offset=${
                page * resultsAmount.pokemons - resultsAmount.pokemons
              }`
            );
            dispatch({
              type: PayloadTypes.pokemonsPagination,
              payload: {
                currentPokemons: data?.mapped || [],
                basePokemons: data?.base,
                currentPage: page,
              },
            });
          } catch (error) {
            handleCatch(error);
          }
        } else {
          const index = page * resultsAmount.pokemons;
          dispatch({
            type: PayloadTypes.pokemonsPagination,
            payload: {
              currentPokemons: pokemons.slice(index - resultsAmount.pokemons, index),
              currentPage: page,
            },
          });
        }
      }
      if (isMove) {
        if (shouldFetchSearch.moves) {
          try {
            const data = await fetchAndMapMoves(
              `${API.MOVE}?limit=${resultsAmount.moves}&offset=${
                page * resultsAmount.moves - resultsAmount.moves
              }`
            );
            dispatch({
              type: PayloadTypes.movesPagination,
              payload: {
                baseMoves: data?.base,
                currentMoves: data?.mapped || [],
                currentPage: page,
              },
            });
          } catch (error) {
            handleCatch(error);
          }
        } else {
          const index = page * resultsAmount.moves;
          dispatch({
            type: PayloadTypes.movesPagination,
            payload: {
              currentMoves: moves.slice(index - resultsAmount.moves, index),
              currentPage: page,
            },
          });
        }
      }
      if (isType) {
        if (shouldFetchSearch.types) {
          try {
            const data = await fetchAndMapTypes(
              `${API.TYPE}?limit=${resultsAmount.types}&offset=${
                page * resultsAmount.types - resultsAmount.types
              }`
            );
            dispatch({
              type: PayloadTypes.typesPagination,
              payload: {
                baseTypes: data?.base,
                currentTypes: data?.mapped || [],
                currentPage: page,
              },
            });
          } catch (error) {
            handleCatch(error);
          }
        } else {
          const index = page * resultsAmount.types;
          dispatch({
            type: PayloadTypes.typesPagination,
            payload: {
              currentTypes: types.slice(index - resultsAmount.types, index),
              currentPage: page,
            },
          });
        }
      }
    }
    setIsLoading(false);
  };

  return {
    nextPage,
    previousPage,
    specificPage,
    handleSorting,
    handleResultsAmount,
  };
};
