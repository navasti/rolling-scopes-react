import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialMoveState, moveReducer } from 'reducers';
import {
  MoveBaseData,
  MoveSorting,
  MoveActionType,
  MoveContextProps,
  PokemonMoveDetails,
} from 'types';

export const MoveContext = createContext<MoveContextProps>({} as MoveContextProps);

export const MoveContextProvider = ({ children }: { children: JSX.Element }) => {
  const [moveState, dispatch] = useReducer(moveReducer, initialMoveState);
  const { moveState: state } = useMemo(() => ({ moveState, dispatch }), [moveState, dispatch]);

  const setSearchResults = useCallback(
    (searchResults: Array<PokemonMoveDetails> | null) => {
      dispatch({
        type: MoveActionType.setSearchResults,
        payload: { searchResults },
      });
    },
    [dispatch]
  );
  const setCurrentPageResults = useCallback(
    (currentPageResults: Array<PokemonMoveDetails>) => {
      dispatch({
        type: MoveActionType.setCurrentPageResults,
        payload: { currentPageResults },
      });
    },
    [dispatch]
  );
  const setAllDataResults = useCallback(
    (allDataResults: Array<PokemonMoveDetails>) => {
      dispatch({
        type: MoveActionType.setAllDataResults,
        payload: { allDataResults },
      });
    },
    [dispatch]
  );
  const setSorting = useCallback(
    (sorting: MoveSorting) => {
      dispatch({
        type: MoveActionType.setSorting,
        payload: { sorting },
      });
    },
    [dispatch]
  );
  const setCurrentPage = useCallback(
    (currentPage: number) => {
      dispatch({
        type: MoveActionType.setCurrentPage,
        payload: { currentPage },
      });
    },
    [dispatch]
  );
  const setBaseData = useCallback(
    (baseData: MoveBaseData) => {
      dispatch({
        type: MoveActionType.setBaseData,
        payload: { baseData },
      });
    },
    [dispatch]
  );
  return (
    <MoveContext.Provider
      value={{
        moveState: state,
        setCurrentPageResults,
        setAllDataResults,
        setSearchResults,
        setCurrentPage,
        setBaseData,
        setSorting,
      }}
    >
      {children}
    </MoveContext.Provider>
  );
};

export const useMoveContext = () => {
  const context = useContext(MoveContext);
  if (context === undefined) {
    throw new Error('useMoveContext must be used within MoveContext');
  } else return context;
};
