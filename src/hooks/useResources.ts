import { useGlobalData } from './useGlobalData';
import { useGlobalContext } from 'contexts';
import { MouseEvent } from 'react';
import { API } from 'appConstants';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonDetails,
  PokemonSorting,
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
    setAllData,
    state: { allDataResults, searchResults, resultsAmount, baseData, currentPage },
  } = useGlobalContext();
  const { shouldFetchSearch } = useGlobalData();

  const isPokemon = resourceType === 'pokemons';
  const isMove = resourceType === 'moves';
  const isType = resourceType === 'types';

  let results: PokemonMoveDetails[] | PokemonTypeDetails[] | PokemonDetails[];
  if (isPokemon)
    results = searchResults.pokemons?.length ? searchResults.pokemons : allDataResults.pokemons;
  else if (isMove)
    results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
  else results = searchResults.types?.length ? searchResults.types : allDataResults.types;

  const sort = (sorting: PokemonSorting | MoveSorting | TypeSorting) => {
    if (isPokemon) {
      const pokemons = results as PokemonDetails[];
      switch (sorting) {
        case PokemonSorting.alphabetical:
          return sortPokemon(pokemons).alphabetical();
        case PokemonSorting.baseExperience:
          return sortPokemon(pokemons).byBaseExperience();
        case PokemonSorting.height:
          return sortPokemon(pokemons).byHeight();
        case PokemonSorting.weight:
          return sortPokemon(pokemons).byWeight();
        case PokemonSorting.none:
          return sortPokemon(pokemons).byId();
      }
    }
    if (isMove) {
      const moves = results as PokemonMoveDetails[];
      switch (sorting) {
        case MoveSorting.accuracy:
          return sortMove(moves).byAccuracy();
        case MoveSorting.alphabetical:
          return sortMove(moves).alphabetical();
        case MoveSorting.power:
          return sortMove(moves).byPower();
        case MoveSorting.pp:
          return sortMove(moves).byPP();
        case MoveSorting.none:
          return sortMove(moves).byId();
      }
    }
    if (isType) {
      const types = results as PokemonTypeDetails[];
      switch (sorting) {
        case TypeSorting.alphabetical:
          return sortType(types).alphabetical();
        case TypeSorting.movesAmount:
          return sortType(types).byMovesAmount();
        case TypeSorting.pokemonsAmount:
          return sortType(types).byPokemonsAmount();
        case TypeSorting.none:
          return sortType(types).byId();
      }
    }
  };

  const handleSorting = async (sorting: PokemonSorting | MoveSorting | TypeSorting) => {
    if (isPokemon) {
      if (sorting === PokemonSorting.none && !searchResults.pokemons) {
        setAllData({ isLoading: true });
        const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount.pokemons}`);
        setAllData({
          sorting: { pokemons: sorting },
          currentPokemons: data?.mapped,
          currentPage: { pokemons: 1 },
          basePokemons: data?.base,
          isLoading: false,
        });
      } else {
        const sorted = sort(sorting as PokemonSorting) as PokemonDetails[];
        const currentPokemons = sorted?.slice(0, resultsAmount.pokemons);
        setAllData({
          sorting: { pokemons: sorting as PokemonSorting },
          searchResults: { pokemons: sorted },
          currentPage: { pokemons: 1 },
          currentPokemons,
        });
      }
    }
    if (isMove) {
      if (sorting === MoveSorting.none && !searchResults.moves?.length) {
        try {
          setAllData({ isLoading: true });
          const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount.moves}`);
          setAllData({
            isLoading: false,
            sorting: { moves: sorting as MoveSorting },
            currentMoves: data?.mapped,
            currentPage: { moves: 1 },
            baseMoves: data?.base,
          });
        } catch (error) {
          handleCatch(error);
        }
      } else {
        const sorted = sort(sorting as MoveSorting) as PokemonMoveDetails[];
        const currentMoves = sorted?.slice(0, resultsAmount.moves);
        setAllData({
          sorting: { moves: sorting as MoveSorting },
          searchResults: { moves: sorted },
          currentPage: { moves: 1 },
          currentMoves,
        });
      }
    }
    if (isType) {
      if (sorting === TypeSorting.none && !searchResults.types?.length) {
        setAllData({ isLoading: true });
        const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount.types}`);
        setAllData({
          isLoading: false,
          sorting: { types: sorting },
          currentTypes: data?.mapped,
          currentPage: { types: 1 },
          baseTypes: data?.base,
        });
      } else {
        const sorted = sort(sorting as TypeSorting) as PokemonTypeDetails[];
        const currentTypes = sorted?.slice(0, resultsAmount.types);
        setAllData({
          sorting: { types: sorting as TypeSorting },
          searchResults: { types: sorted },
          currentPage: { types: 1 },
          currentTypes,
        });
      }
    }
  };

  const handleResultsAmount = async (resultsAmount: number) => {
    if (isPokemon) {
      if (shouldFetchSearch.pokemons) {
        try {
          const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount}`);
          setAllData({
            isLoading: false,
            basePokemons: data?.base,
            currentPokemons: data?.mapped,
            resultsAmount: { pokemons: resultsAmount },
            currentPage: { pokemons: 1 },
          });
        } catch (error) {
          setAllData({ isLoading: false });
          handleCatch(error);
        }
      } else {
        const pokemons = results as PokemonDetails[];
        setAllData({
          currentPage: { pokemons: 1 },
          resultsAmount: { pokemons: resultsAmount },
          currentPokemons: pokemons.slice(0, resultsAmount),
        });
      }
    }
    if (isMove) {
      if (shouldFetchSearch.moves) {
        try {
          const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`);
          setAllData({
            isLoading: false,
            baseMoves: data?.base,
            currentPage: { moves: 1 },
            currentMoves: data?.mapped,
            resultsAmount: { moves: resultsAmount },
          });
        } catch (error) {
          setAllData({ isLoading: false });
          handleCatch(error);
        }
      } else {
        const moves = results as PokemonMoveDetails[];
        setAllData({
          currentPage: { moves: 1 },
          resultsAmount: { moves: resultsAmount },
          currentMoves: moves.slice(0, resultsAmount),
        });
      }
    }
    if (isType) {
      if (shouldFetchSearch.types) {
        setAllData({ isLoading: true });
        try {
          const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount}`);
          setAllData({
            isLoading: false,
            baseTypes: data?.base,
            currentPage: { types: 1 },
            currentTypes: data?.mapped,
            resultsAmount: { types: resultsAmount },
          });
        } catch (error) {
          handleCatch(error);
          setAllData({ isLoading: false });
        }
      } else {
        const types = results as PokemonTypeDetails[];
        setAllData({
          currentPage: { types: 1 },
          resultsAmount: { types: resultsAmount },
          currentTypes: types.slice(0, resultsAmount),
        });
      }
    }
  };

  const nextPage = async () => {
    if (isPokemon) {
      if (shouldFetchSearch.pokemons && baseData.pokemons?.next) {
        try {
          setAllData({ isLoading: true });
          const data = await fetchAndMapPokemons(baseData.pokemons.next);
          setAllData({
            isLoading: false,
            basePokemons: data?.base,
            currentPokemons: data?.mapped,
            currentPage: { pokemons: currentPage.pokemons + 1 },
          });
        } catch (error) {
          setAllData({ isLoading: false });
          handleCatch(error);
        }
      } else {
        const index = currentPage.pokemons * resultsAmount.pokemons;
        const pokemons = results as PokemonDetails[];
        setAllData({
          currentPokemons: pokemons.slice(index, index + resultsAmount.pokemons),
          currentPage: { pokemons: currentPage.pokemons + 1 },
        });
      }
    }
    if (isMove) {
      if (shouldFetchSearch.moves && baseData.moves?.next) {
        try {
          setAllData({ isLoading: true });
          const data = await fetchAndMapMoves(baseData.moves.next);
          setAllData({
            isLoading: false,
            baseMoves: data?.base,
            currentMoves: data?.mapped,
            currentPage: { moves: currentPage.moves + 1 },
          });
        } catch (error) {
          setAllData({ isLoading: false });
          handleCatch(error);
        }
      } else {
        const index = currentPage.moves * resultsAmount.moves;
        const moves = results as PokemonMoveDetails[];
        setAllData({
          currentMoves: moves.slice(index, index + resultsAmount.moves),
          currentPage: { moves: currentPage.moves + 1 },
        });
      }
    }
    if (isType) {
      if (shouldFetchSearch.types && baseData.types?.next) {
        try {
          setAllData({ isLoading: true });
          const data = await fetchAndMapTypes(baseData.types.next);
          setAllData({
            isLoading: false,
            baseTypes: data?.base,
            currentTypes: data?.mapped,
            currentPage: { types: currentPage.types + 1 },
          });
        } catch (error) {
          setAllData({ isLoading: false });
          handleCatch(error);
        }
      } else {
        const index = currentPage.types * resultsAmount.types;
        const types = results as PokemonTypeDetails[];
        setAllData({
          currentTypes: types.slice(index, index + resultsAmount.types),
          currentPage: { types: currentPage.types + 1 },
        });
      }
    }
  };

  const previousPage = async () => {
    if (isPokemon) {
      if (shouldFetchSearch.pokemons && baseData.pokemons?.previous) {
        try {
          setAllData({ isLoading: true });
          const data = await fetchAndMapPokemons(baseData.pokemons.previous);
          setAllData({
            isLoading: false,
            basePokemons: data?.base,
            currentPokemons: data?.mapped,
            currentPage: { pokemons: currentPage.pokemons - 1 },
          });
        } catch (error) {
          setAllData({ isLoading: false });
          handleCatch(error);
        }
      } else {
        const index = (currentPage.pokemons - 1) * resultsAmount.pokemons;
        const pokemons = results as PokemonDetails[];
        setAllData({
          currentPokemons: pokemons.slice(index - resultsAmount.pokemons, index),
          currentPage: { pokemons: currentPage.pokemons - 1 },
        });
      }
    }
    if (isMove) {
      if (shouldFetchSearch.moves && baseData.moves?.previous) {
        try {
          setAllData({ isLoading: true });
          const data = await fetchAndMapMoves(baseData.moves.previous);
          setAllData({
            isLoading: false,
            baseMoves: data?.base,
            currentMoves: data?.mapped,
            currentPage: { moves: currentPage.moves - 1 },
          });
        } catch (error) {
          setAllData({ isLoading: false });
          handleCatch(error);
        }
      } else {
        const index = (currentPage.moves - 1) * resultsAmount.moves;
        const moves = results as PokemonMoveDetails[];
        setAllData({
          currentMoves: moves.slice(index - resultsAmount.moves, index),
          currentPage: { moves: currentPage.moves - 1 },
        });
      }
    }
    if (isType) {
      if (shouldFetchSearch.types && baseData.types?.previous) {
        try {
          setAllData({ isLoading: true });
          const data = await fetchAndMapTypes(baseData.types.previous);
          setAllData({
            isLoading: false,
            baseTypes: data?.base,
            currentTypes: data?.mapped,
            currentPage: { types: currentPage.types - 1 },
          });
        } catch (error) {
          setAllData({ isLoading: false });
          handleCatch(error);
        }
      } else {
        const index = (currentPage.types - 1) * resultsAmount.types;
        const types = results as PokemonTypeDetails[];
        setAllData({
          currentTypes: types.slice(index - resultsAmount.types, index),
          currentPage: { types: currentPage.types - 1 },
        });
      }
    }
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (page != NaN) {
      if (isPokemon) {
        if (shouldFetchSearch.pokemons) {
          setAllData({ isLoading: true });
          try {
            const data = await fetchAndMapPokemons(
              `${API.POKEMON}?limit=${resultsAmount.pokemons}&offset=${
                page * resultsAmount.pokemons - resultsAmount.pokemons
              }`
            );
            setAllData({
              isLoading: false,
              basePokemons: data?.base,
              currentPokemons: data?.mapped,
              currentPage: { pokemons: page },
            });
          } catch (error) {
            setAllData({ isLoading: false });
            handleCatch(error);
          }
        } else {
          const index = page * resultsAmount.pokemons;
          const pokemons = results as PokemonDetails[];
          setAllData({
            currentPokemons: pokemons.slice(index - resultsAmount.pokemons, index),
            currentPage: { pokemons: page },
          });
        }
      }
      if (isMove) {
        if (shouldFetchSearch.moves) {
          try {
            setAllData({ isLoading: true });
            const data = await fetchAndMapMoves(
              `${API.MOVE}?limit=${resultsAmount.moves}&offset=${
                page * resultsAmount.moves - resultsAmount.moves
              }`
            );
            setAllData({
              isLoading: false,
              baseMoves: data?.base,
              currentMoves: data?.mapped,
              currentPage: { moves: page },
            });
          } catch (error) {
            setAllData({ isLoading: false });
            handleCatch(error);
          }
        } else {
          const index = page * resultsAmount.moves;
          const moves = results as PokemonMoveDetails[];
          setAllData({
            currentMoves: moves.slice(index - resultsAmount.moves, index),
            currentPage: { moves: page },
          });
        }
      }
      if (isType) {
        if (shouldFetchSearch.types) {
          try {
            setAllData({ isLoading: true });
            const data = await fetchAndMapTypes(
              `${API.TYPE}?limit=${resultsAmount.types}&offset=${
                page * resultsAmount.types - resultsAmount.types
              }`
            );
            setAllData({
              isLoading: false,
              baseTypes: data?.base,
              currentTypes: data?.mapped,
              currentPage: { types: page },
            });
          } catch (error) {
            setAllData({ isLoading: false });
            handleCatch(error);
          }
        } else {
          const index = page * resultsAmount.types;
          const types = results as PokemonTypeDetails[];
          setAllData({
            currentTypes: types.slice(index - resultsAmount.types, index),
            currentPage: { types: page },
          });
        }
      }
    }
  };

  return {
    nextPage,
    previousPage,
    specificPage,
    handleSorting,
    handleResultsAmount,
  };
};
