import { SortingSelector, ResultsSelector, Pagination } from 'modules/SearchPage/components';
import { fetchAndMapMoves, handleCatch, sortMove } from 'utils';
import { API, RESULTS_AMOUNT } from 'appConstants';
import { MoveCard } from './components/MoveCard';
import { useGlobalContext } from 'contexts';
import { useGlobalData } from 'hooks';
import { MoveSorting } from 'types';
import { Loader } from 'components';
import { MouseEvent } from 'react';
import * as S from './styled';

export const MoveView = () => {
  const { totalPageCounts, shouldFetchSearch } = useGlobalData();
  const options = Object.values(MoveSorting);

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

  const sort = (sorting: MoveSorting) => {
    const results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
    switch (sorting) {
      case MoveSorting.accuracy:
        return sortMove(results).byAccuracy();
      case MoveSorting.alphabetical:
        return sortMove(results).alphabetical();
      case MoveSorting.power:
        return sortMove(results).byPower();
      case MoveSorting.pp:
        return sortMove(results).byPP();
      default:
        return sortMove(results).byId();
    }
  };

  const handleSorting = (sorting: string) => {
    setAllData({ isLoading: true });
    if (sorting === MoveSorting.none && !searchResults.moves?.length) {
      fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount.moves}`)
        .then((data) =>
          setAllData({
            isLoading: false,
            sorting: { moves: sorting },
            currentMoves: data?.mapped,
            currentPage: { moves: 1 },
            baseMoves: data?.base,
          })
        )
        .catch((error) => handleCatch(error));
    } else {
      const sorted = sort(sorting as MoveSorting);
      const currentMoves = sorted?.slice(0, resultsAmount.moves);
      setAllData({
        isLoading: false,
        sorting: { moves: sorting as MoveSorting },
        searchResults: { moves: sorted },
        currentPage: { moves: 1 },
        currentMoves,
      });
    }
  };

  const nextPage = () => {
    setAllData({ isLoading: true });
    if (shouldFetchSearch.moves && baseData.moves?.next) {
      fetchAndMapMoves(baseData.moves.next)
        .then((data) =>
          setAllData({
            isLoading: false,
            baseMoves: data?.base,
            currentMoves: data?.mapped,
            currentPage: {
              moves: currentPage.moves + 1,
            },
          })
        )
        .catch((error) => handleCatch(error));
    } else {
      const index = currentPage.moves * resultsAmount.moves;
      const results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
      const currentMoves = results.slice(index, index + resultsAmount.moves);
      setAllData({
        isLoading: false,
        currentMoves,
        currentPage: {
          moves: currentPage.moves + 1,
        },
      });
    }
  };

  const previousPage = () => {
    setAllData({ isLoading: true });
    if (shouldFetchSearch.moves && baseData.moves?.previous) {
      fetchAndMapMoves(baseData.moves.previous)
        .then((data) =>
          setAllData({
            isLoading: false,
            baseMoves: data?.base,
            currentMoves: data?.mapped,
            currentPage: {
              moves: currentPage.moves - 1,
            },
          })
        )
        .catch((error) => handleCatch(error));
    } else {
      const index = (currentPage.moves - 1) * resultsAmount.moves;
      const results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
      const currentMoves = results.slice(index - resultsAmount.moves, index);
      setAllData({
        isLoading: false,
        currentMoves,
        currentPage: {
          moves: currentPage.moves - 1,
        },
      });
    }
  };

  const specificPage = (event: MouseEvent<HTMLButtonElement>) => {
    setAllData({ isLoading: true });
    const page = Number(event.currentTarget.textContent);
    if (page !== NaN) {
      if (shouldFetchSearch.moves) {
        fetchAndMapMoves(
          `${API.MOVE}?limit=${resultsAmount.moves}&offset=${
            page * resultsAmount.moves - resultsAmount.moves
          }`
        )
          .then((data) =>
            setAllData({
              isLoading: false,
              baseMoves: data?.base,
              currentMoves: data?.mapped,
              currentPage: {
                moves: page,
              },
            })
          )
          .catch((error) => handleCatch(error));
      } else {
        const index = page * resultsAmount.moves;
        const results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
        const currentMoves = results.slice(index - resultsAmount.moves, index);
        setAllData({
          isLoading: false,
          currentMoves,
          currentPage: {
            moves: page,
          },
        });
      }
    }
  };

  const handleResultsAmount = (resultsAmount: number) => {
    setAllData({ isLoading: true });
    if (shouldFetchSearch.moves) {
      fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`)
        .then((data) =>
          setAllData({
            isLoading: false,
            baseMoves: data?.base,
            currentMoves: data?.mapped,
            resultsAmount: {
              moves: resultsAmount,
            },
            currentPage: {
              moves: 1,
            },
          })
        )
        .catch((error) => handleCatch(error));
    } else {
      const results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
      const currentMoves = results.slice(0, resultsAmount);
      setAllData({
        currentMoves,
        isLoading: false,
        resultsAmount: {
          moves: resultsAmount,
        },
        currentPage: {
          moves: 1,
        },
      });
    }
  };

  return (
    <S.MoveView>
      <S.SelectorsWrapper>
        <SortingSelector
          onChange={handleSorting}
          value={sorting.moves}
          options={options}
          name="move"
        />
        <ResultsSelector
          options={RESULTS_AMOUNT.MOVE}
          onClick={handleResultsAmount}
          value={resultsAmount.moves}
        />
      </S.SelectorsWrapper>
      <Pagination
        totalPageCount={totalPageCounts.moves}
        currentPage={currentPage.moves}
        previousPage={previousPage}
        specificPage={specificPage}
        nextPage={nextPage}
      />
      {!currentPageResults.moves.length && <S.TextCenter>No moves found</S.TextCenter>}
      {isLoading && <Loader />}
      <S.CardsWrapper visible={!isLoading}>
        {currentPageResults.moves.map((move) => (
          <MoveCard key={move.id} move={move} />
        ))}
      </S.CardsWrapper>
    </S.MoveView>
  );
};
