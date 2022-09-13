import { SortingSelector, ResultsSelector, Pagination } from 'modules/SearchPage/components';
import { API, RESULTS_AMOUNT } from 'appConstants';
import { fetchAndMapTypes, sortType } from 'utils';
import { TypeCard } from './components/TypeCard';
import { useGlobalContext } from 'contexts';
import { useGlobalData } from 'hooks';
import { TypeSorting } from 'types';
import { Loader } from 'components';
import { MouseEvent } from 'react';
import * as S from './styled';

export const TypeView = () => {
  const { totalPageCounts, shouldFetchSearch } = useGlobalData();
  const options = Object.values(TypeSorting);

  const {
    setAllData,
    state: {
      allDataResults,
      currentPageResults,
      searchResults,
      isLoading,
      resultsAmount,
      currentPage,
      baseData,
      sorting,
    },
  } = useGlobalContext();

  const sort = (sorting: TypeSorting) => {
    const results = searchResults.types?.length ? searchResults.types : allDataResults.types;
    switch (sorting) {
      case TypeSorting.alphabetical:
        return sortType(results).alphabetical();
      case TypeSorting.movesAmount:
        return sortType(results).byMovesAmount();
      case TypeSorting.pokemonsAmount:
        return sortType(results).byPokemonsAmount();
      default:
        return sortType(results).byId();
    }
  };

  const handleSorting = async (sorting: string) => {
    if (sorting === TypeSorting.none && !searchResults.types?.length) {
      const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount.types}`);
      setAllData({
        sorting: { types: sorting },
        currentTypes: data.mapped,
        currentPage: { types: 1 },
        baseTypes: data.base,
      });
    } else {
      const sorted = sort(sorting as TypeSorting);
      const currentTypes = sorted?.slice(0, resultsAmount.types);
      setAllData({
        sorting: { types: sorting as TypeSorting },
        searchResults: { types: sorted },
        currentPage: { types: 1 },
        currentTypes,
      });
    }
  };

  const nextPage = async () => {
    if (shouldFetchSearch.types && baseData.types?.next) {
      const data = await fetchAndMapTypes(baseData.types.next);
      setAllData({
        baseTypes: data.base,
        currentTypes: data.mapped,
        currentPage: {
          types: currentPage.types + 1,
        },
      });
    } else {
      const index = currentPage.types * resultsAmount.types;
      const results = searchResults.types?.length ? searchResults.types : allDataResults.types;
      const currentTypes = results.slice(index, index + resultsAmount.types);
      setAllData({
        currentTypes,
        currentPage: {
          types: currentPage.types + 1,
        },
      });
    }
  };

  const previousPage = async () => {
    if (shouldFetchSearch.types && baseData.types?.previous) {
      const data = await fetchAndMapTypes(baseData.types.previous);
      setAllData({
        baseTypes: data.base,
        currentTypes: data.mapped,
        currentPage: {
          types: currentPage.types - 1,
        },
      });
    } else {
      const index = (currentPage.types - 1) * resultsAmount.types;
      const results = searchResults.types?.length ? searchResults.types : allDataResults.types;
      const currentTypes = results.slice(index - resultsAmount.types, index);
      setAllData({
        currentTypes,
        currentPage: {
          types: currentPage.types - 1,
        },
      });
    }
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (page !== NaN) {
      if (shouldFetchSearch.types) {
        const data = await fetchAndMapTypes(
          `${API.TYPE}?limit=${resultsAmount.types}&offset=${
            page * resultsAmount.types - resultsAmount.types
          }`
        );
        setAllData({
          baseTypes: data.base,
          currentTypes: data.mapped,
          currentPage: {
            types: page,
          },
        });
      } else {
        const index = page * resultsAmount.types;
        const results = searchResults.types?.length ? searchResults.types : allDataResults.types;
        const currentTypes = results.slice(index - resultsAmount.types, index);
        setAllData({
          currentTypes,
          currentPage: {
            types: page,
          },
        });
      }
    }
  };

  const handleResultsAmount = async (resultsAmount: number) => {
    if (shouldFetchSearch.types) {
      const data = await fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount}`);
      setAllData({
        baseTypes: data.base,
        currentTypes: data.mapped,
        resultsAmount: {
          types: resultsAmount,
        },
        currentPage: {
          types: 1,
        },
      });
    } else {
      const results = searchResults.types?.length ? searchResults.types : allDataResults.types;
      const currentTypes = results.slice(0, resultsAmount);
      setAllData({
        currentTypes,
        resultsAmount: {
          types: resultsAmount,
        },
        currentPage: {
          types: 1,
        },
      });
    }
  };

  return (
    <S.TypeView>
      <S.SelectorsWrapper>
        <SortingSelector
          name="type"
          options={options}
          value={sorting.types}
          onChange={handleSorting}
        />
        <ResultsSelector
          options={RESULTS_AMOUNT.TYPE}
          onClick={handleResultsAmount}
          value={resultsAmount.types}
        />
      </S.SelectorsWrapper>
      <Pagination
        totalPageCount={totalPageCounts.types}
        currentPage={currentPage.types}
        previousPage={previousPage}
        specificPage={specificPage}
        nextPage={nextPage}
      />
      {!currentPageResults.types?.length && <S.TextCenter>No types found</S.TextCenter>}
      {isLoading && <Loader />}
      <S.CardsWrapper visible={!isLoading}>
        {currentPageResults.types.map((type) => (
          <TypeCard key={type.id} type={type} />
        ))}
      </S.CardsWrapper>
    </S.TypeView>
  );
};
