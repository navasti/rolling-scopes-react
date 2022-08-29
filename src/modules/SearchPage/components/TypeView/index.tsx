import { useSearchContext, useTypeContext } from 'contexts';
import { ResultsSelector } from '../ResultsSelector';
import { SortingSelector } from '../SortingSelector';
import { API, RESULTS_AMOUNT } from 'appConstants';
import { TypeCard } from './components/TypeCard';
import { Pagination } from '../Pagination';
import { fetchAndMapTypes } from 'utils';
import { Loader } from 'components';
import { TypeSorting } from 'types';
import { useTypeData } from 'hooks';
import { MouseEvent } from 'react';
import * as S from './styled';

export const TypeView = () => {
  const {
    setSorting,
    setBaseData,
    setCurrentPage,
    setResultsAmount,
    setSearchResults,
    setCurrentPageResults,
    typeState: {
      sorting,
      baseData,
      currentPage,
      searchResults,
      resultsAmount,
      allDataResults,
      currentPageResults,
    },
  } = useTypeContext();

  const {
    totalPageCount,
    shouldFetchSearch,
    sortById,
    sortByMovesAmount,
    sortAlphabetically,
    sortByPokemonsAmount,
  } = useTypeData();

  const {
    setIsLoading,
    searchState: { isLoading },
  } = useSearchContext();

  const options = Object.values(TypeSorting);

  const sort = (sorting: TypeSorting) => {
    switch (sorting) {
      case TypeSorting.alphabetical:
        return sortAlphabetically();
      case TypeSorting.movesAmount:
        return sortByMovesAmount();
      case TypeSorting.pokemonsAmount:
        return sortByPokemonsAmount();
      default:
        return sortById();
    }
  };

  const handleSorting = (sorting: string) => {
    if (sorting === TypeSorting.none && !searchResults) {
      fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount}`).then((types) => {
        types.base && setBaseData(types.base);
        setCurrentPageResults(types.mapped);
      });
    } else {
      const sorted = sort(sorting as TypeSorting);
      const results = sorted?.slice(0, resultsAmount);
      if (sorted && results) {
        setCurrentPageResults(results);
        setSearchResults(sorted);
      }
    }
    setSorting(sorting as TypeSorting);
    setCurrentPage(1);
  };

  const nextPage = async () => {
    if (shouldFetchSearch && baseData.next) {
      fetchAndMapTypes(baseData.next).then((types) => {
        setIsLoading(true);
        const { base, mapped } = types;
        if (base) {
          setBaseData(base);
          setCurrentPageResults(mapped);
          setCurrentPage(currentPage + 1);
        }
        setIsLoading(false);
      });
    } else {
      const index = currentPage * resultsAmount;
      const results = (searchResults || allDataResults).slice(index, index + resultsAmount);
      setCurrentPageResults(results);
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = async () => {
    if (shouldFetchSearch && baseData.previous) {
      fetchAndMapTypes(baseData.previous).then((types) => {
        setIsLoading(true);
        const { base, mapped } = types;
        if (base) {
          setBaseData(base);
          setCurrentPageResults(mapped);
          setCurrentPage(currentPage - 1);
        }
        setIsLoading(false);
      });
    } else {
      const index = (currentPage - 1) * resultsAmount;
      const results = (searchResults || allDataResults).slice(index - resultsAmount, index);
      setCurrentPageResults(results);
      setCurrentPage(currentPage - 1);
    }
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (page !== NaN) {
      if (shouldFetchSearch) {
        setIsLoading(true);
        fetchAndMapTypes(
          `${API.TYPE}?limit=${resultsAmount}&offset=${page * resultsAmount - resultsAmount}`
        ).then((types) => {
          const { base, mapped } = types;
          if (base) {
            setBaseData(base);
            setCurrentPageResults(mapped);
          }
          setCurrentPage(page);
          setIsLoading(false);
        });
      } else {
        const index = page * resultsAmount;
        const results = (searchResults || allDataResults).slice(index - resultsAmount, index);
        setCurrentPageResults(results);
        setCurrentPage(page);
      }
    }
  };

  const handleResultsAmount = (resultsAmount: number) => {
    setResultsAmount(resultsAmount);
    if (shouldFetchSearch) {
      setIsLoading(true);
      fetchAndMapTypes(`${API.TYPE}?limit=${resultsAmount}`).then((types) => {
        const { base, mapped } = types;
        if (base) {
          setBaseData(base);
          setCurrentPageResults(mapped);
        }
        setCurrentPage(1);
        setIsLoading(false);
      });
    } else {
      const results = (searchResults || allDataResults).slice(0, resultsAmount);
      setCurrentPageResults(results);
      setCurrentPage(1);
    }
  };

  return (
    <S.TypeView>
      <S.SelectorsWrapper>
        <SortingSelector name="type" onChange={handleSorting} options={options} value={sorting} />
        <ResultsSelector
          options={RESULTS_AMOUNT.TYPE}
          onClick={handleResultsAmount}
          value={resultsAmount}
        />
      </S.SelectorsWrapper>
      <Pagination
        totalPageCount={totalPageCount}
        previousPage={previousPage}
        specificPage={specificPage}
        currentPage={currentPage}
        nextPage={nextPage}
      />
      {!currentPageResults.length && <S.TextCenter>No types found</S.TextCenter>}
      {isLoading && <Loader />}
      <S.CardsWrapper visible={!isLoading}>
        {currentPageResults.map((type) => (
          <TypeCard key={type.id} type={type} />
        ))}
      </S.CardsWrapper>
    </S.TypeView>
  );
};
