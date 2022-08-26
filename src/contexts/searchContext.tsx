import { SearchContextProps, SearchActionType, Lengths, SearchingResults } from 'types';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialSearchState, searchReducer } from 'reducers';
import { AvailableTabs } from 'appConstants';

export const SearchContext = createContext<SearchContextProps>({} as SearchContextProps);

export const SearchContextProvider = ({ children }: { children: JSX.Element }) => {
  const [searchState, dispatch] = useReducer(searchReducer, initialSearchState);
  const { searchState: state } = useMemo(
    () => ({ searchState, dispatch }),
    [searchState, dispatch]
  );
  const setSearchingResults = useCallback((searchingResults: SearchingResults | null) => {
    dispatch({
      type: SearchActionType.searchingResults,
      payload: { searchingResults },
    });
  }, []);
  const setActiveTab = useCallback(
    (activeTab: AvailableTabs) => {
      dispatch({ type: SearchActionType.tab, payload: { activeTab } });
    },
    [dispatch]
  );
  const setIsLoading = useCallback(
    (isLoading: boolean) => {
      dispatch({ type: SearchActionType.isLoading, payload: { isLoading } });
    },
    [dispatch]
  );
  const setLengths = useCallback(
    (lengths: Lengths) => {
      dispatch({ type: SearchActionType.lengths, payload: { lengths } });
    },
    [dispatch]
  );
  return (
    <SearchContext.Provider
      value={{
        searchState: state,
        setSearchingResults,
        setIsLoading,
        setActiveTab,
        setLengths,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within SearchContext');
  } else return context;
};
