import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialTypeState, typeReducer } from 'reducers';
import {
  TypeSorting,
  TypeBaseData,
  TypeActionType,
  TypeContextProps,
  PokemonTypeDetails,
} from 'types';

export const TypeContext = createContext<TypeContextProps>({} as TypeContextProps);

export const TypeContextProvider = ({ children }: { children: JSX.Element }) => {
  const [typeState, dispatch] = useReducer(typeReducer, initialTypeState);
  const { typeState: state } = useMemo(() => ({ typeState, dispatch }), [typeState, dispatch]);
  const setCurrentPageResults = useCallback(
    (currentPageResults: Array<PokemonTypeDetails>) => {
      dispatch({
        type: TypeActionType.setCurrentPageResults,
        payload: { currentPageResults },
      });
    },
    [dispatch]
  );
  const setAllDataResults = useCallback(
    (allDataResults: Array<PokemonTypeDetails>) => {
      dispatch({
        type: TypeActionType.setAllDataResults,
        payload: { allDataResults },
      });
    },
    [dispatch]
  );
  const setSorting = useCallback(
    (sorting: TypeSorting) => {
      dispatch({
        type: TypeActionType.setSorting,
        payload: { sorting },
      });
    },
    [dispatch]
  );
  const setCurrentPage = useCallback(
    (currentPage: number) => {
      dispatch({
        type: TypeActionType.setCurrentPage,
        payload: { currentPage },
      });
    },
    [dispatch]
  );
  const setBaseData = useCallback(
    (baseData: TypeBaseData) => {
      dispatch({
        type: TypeActionType.setBaseData,
        payload: { baseData },
      });
    },
    [dispatch]
  );
  return (
    <TypeContext.Provider
      value={{
        typeState: state,
        setSorting,
        setBaseData,
        setCurrentPage,
        setAllDataResults,
        setCurrentPageResults,
      }}
    >
      {children}
    </TypeContext.Provider>
  );
};

export const useTypeContext = () => {
  const context = useContext(TypeContext);
  if (context === undefined) {
    throw new Error('useTypeContext must be used within TypeContext');
  } else return context;
};
