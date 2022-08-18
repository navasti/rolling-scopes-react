import { createContext, useCallback, useContext, useReducer } from 'react';
import { initialState, globalReducer } from 'reducers';
import {
  PokemonTypeDetails,
  PokemonMoveDetails,
  GlobalActionType,
  PokemonDetails,
  Sorting,
  Lengths,
} from 'types';

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setSorting = useCallback((sorting: Sorting) => {
    dispatch({
      type: GlobalActionType.sorting,
      payload: {
        sorting,
      },
    });
  }, []);

  const setLengths = useCallback((lengths: Lengths) => {
    dispatch({
      type: GlobalActionType.lengths,
      payload: {
        lengths,
      },
    });
  }, []);

  const setPokemons = useCallback((pokemons: Array<PokemonDetails>) => {
    dispatch({
      type: GlobalActionType.pokemons,
      payload: {
        pokemons,
      },
    });
  }, []);

  const setMoves = useCallback((moves: Array<PokemonMoveDetails>) => {
    dispatch({
      type: GlobalActionType.moves,
      payload: {
        moves,
      },
    });
  }, []);

  const setTypes = useCallback((types: Array<PokemonTypeDetails>) => {
    dispatch({
      type: GlobalActionType.types,
      payload: {
        types,
      },
    });
  }, []);

  const value = {
    setMoves,
    setTypes,
    setLengths,
    setSorting,
    setPokemons,
    pokemons: state.pokemons,
    lengths: state.lengths,
    sorting: state.sorting,
    types: state.types,
    moves: state.moves,
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within GlobalContext');
  } else return context;
};
