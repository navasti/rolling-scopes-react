import { useMoveContext, useSearchContext } from 'contexts';
import { SortingSelector } from '../SortingSelector';
import { MoveCard } from './components/MoveCard';
import { API, Limits } from 'appConstants';
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
    setAllDataResults,
    setCurrentPageResults,
    moveState: { currentPageResults, currentPage, allDataResults, baseData, sorting },
  } = useMoveContext();

  const {
    totalPageCount,
    shouldFetchPagination,
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
    if (sorting === MoveSorting.none) {
      fetchAndMapMoves(`${API.MOVE}${API.MOVE_LIMIT}`).then((moves) => {
        const { base, mapped } = moves;
        if (base) {
          setBaseData(base);
          setSorting(sorting);
          setCurrentPageResults(mapped);
        }
        setCurrentPage(1);
      });
    } else {
      const sorted = sort(sorting as MoveSorting);
      const results = sorted?.slice(0, Limits.move);
      if (sorted && results) {
        setSorting(sorting as MoveSorting);
        setCurrentPageResults(results);
        setAllDataResults(sorted);
        setCurrentPage(1);
      }
    }
  };

  const nextPage = async () => {
    if (shouldFetchPagination && baseData.next) {
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
      const index = currentPage * Limits.move;
      const results = allDataResults.slice(index, index + Limits.move);
      setCurrentPageResults(results);
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = async () => {
    if (shouldFetchPagination && baseData.previous) {
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
      const index = (currentPage - 1) * Limits.move;
      const results = allDataResults.slice(index - Limits.move, index);
      setCurrentPageResults(results);
      setCurrentPage(currentPage - 1);
    }
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (page !== NaN) {
      if (shouldFetchPagination) {
        setIsLoading(true);
        fetchAndMapMoves(`${API.MOVE}${API.MOVE_LIMIT}&${API.getMovesOffset(page)}`).then(
          (moves) => {
            const { base, mapped } = moves;
            if (base) {
              setBaseData(base);
              setCurrentPageResults(mapped);
            }
            setCurrentPage(page);
            setIsLoading(false);
          }
        );
      } else {
        const index = page * Limits.move;
        const results = allDataResults.slice(index - Limits.move, index);
        setCurrentPageResults(results);
        setCurrentPage(page);
      }
    }
  };

  return (
    <S.MoveView>
      <Pagination
        totalPageCount={totalPageCount}
        previousPage={previousPage}
        specificPage={specificPage}
        currentPage={currentPage}
        nextPage={nextPage}
      />
      <SortingSelector name="move" onChange={handleSorting} options={options} value={sorting} />
      <S.CardsWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          currentPageResults.map((move) => <MoveCard key={move.id} move={move} />)
        )}
      </S.CardsWrapper>
    </S.MoveView>
  );
};
