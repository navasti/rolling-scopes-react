import { useMoveContext, useSearchContext } from 'contexts';
import { SortingSelector } from '../SortingSelector';
import { ResultsSelector } from '../ResultsSelector';
import { API, RESULTS_AMOUNT } from 'appConstants';
import { MoveCard } from './components/MoveCard';
import { Pagination } from '../Pagination';
import { fetchAndMapMoves } from 'utils';
import { Loader } from 'components';
import { useMoveData } from 'hooks';
import { MouseEvent } from 'react';
import { MoveSorting } from 'types';
import * as S from './styled';

export const MoveView = () => {
  const {
    setSorting,
    setBaseData,
    setCurrentPage,
    setResultsAmount,
    setSearchResults,
    setCurrentPageResults,
    moveState: {
      sorting,
      baseData,
      currentPage,
      searchResults,
      resultsAmount,
      allDataResults,
      currentPageResults,
    },
  } = useMoveContext();

  const {
    totalPageCount,
    shouldFetchSearch,
    sortById,
    sortByPP,
    sortByPower,
    sortByAccuracy,
    sortAplhabetically,
  } = useMoveData();

  const {
    setIsLoading,
    searchState: { isLoading },
  } = useSearchContext();

  const options = Object.values(MoveSorting);

  const sort = (sorting: MoveSorting) => {
    switch (sorting) {
      case MoveSorting.accuracy:
        return sortByAccuracy();
      case MoveSorting.alphabetical:
        return sortAplhabetically();
      case MoveSorting.power:
        return sortByPower();
      case MoveSorting.pp:
        return sortByPP();
      default:
        return sortById();
    }
  };

  const handleSorting = (sorting: string) => {
    if (sorting === MoveSorting.none && !searchResults) {
      fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`).then((moves) => {
        moves.base && setBaseData(moves.base);
        setCurrentPageResults(moves.mapped);
      });
    } else {
      const sorted = sort(sorting as MoveSorting);
      const results = sorted?.slice(0, resultsAmount);
      if (sorted && results) {
        setCurrentPageResults(results);
        setSearchResults(sorted);
      }
    }
    setSorting(sorting as MoveSorting);
    setCurrentPage(1);
  };

  const nextPage = async () => {
    if (shouldFetchSearch && baseData.next) {
      setIsLoading(true);
      fetchAndMapMoves(baseData.next).then((moves) => {
        const { base, mapped } = moves;
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
      setIsLoading(true);
      fetchAndMapMoves(baseData.previous).then((moves) => {
        const { base, mapped } = moves;
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
        fetchAndMapMoves(
          `${API.MOVE}?limit=${resultsAmount}&offset=${page * resultsAmount - resultsAmount}`
        ).then((moves) => {
          const { base, mapped } = moves;
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
      fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`).then((moves) => {
        const { base, mapped } = moves;
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
    <S.MoveView>
      <S.SelectorsWrapper>
        <SortingSelector name="move" onChange={handleSorting} options={options} value={sorting} />
        <ResultsSelector
          options={RESULTS_AMOUNT.MOVE}
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
        {currentPageResults.map((move) => (
          <MoveCard key={move.id} move={move} />
        ))}
      </S.CardsWrapper>
    </S.MoveView>
  );
};
