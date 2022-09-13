import { SortingSelector, ResultsSelector, Pagination } from 'modules/SearchPage/components';
import { API, RESULTS_AMOUNT } from 'appConstants';
import { fetchAndMapMoves, sortMove } from 'utils';
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

  const handleSorting = async (sorting: string) => {
    if (sorting === MoveSorting.none && !searchResults.moves?.length) {
      const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount.moves}`);
      setAllData({
        sorting: { moves: sorting },
        currentMoves: data.mapped,
        currentPage: { moves: 1 },
        baseMoves: data.base,
      });
    } else {
      const sorted = sort(sorting as MoveSorting);
      const currentMoves = sorted?.slice(0, resultsAmount.moves);
      setAllData({
        sorting: { moves: sorting as MoveSorting },
        searchResults: { moves: sorted },
        currentPage: { moves: 1 },
        currentMoves,
      });
    }
  };

  const nextPage = async () => {
    if (shouldFetchSearch.pokemons && baseData.moves?.next) {
      const data = await fetchAndMapMoves(baseData.moves.next);
      setAllData({
        baseMoves: data.base,
        currentMoves: data.mapped,
        currentPage: {
          moves: currentPage.moves + 1,
        },
      });
    } else {
      const index = currentPage.moves * resultsAmount.moves;
      const results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
      const currentMoves = results.slice(index, index + resultsAmount.moves);
      setAllData({
        currentMoves,
        currentPage: {
          moves: currentPage.moves + 1,
        },
      });
    }
  };

  const previousPage = async () => {
    if (shouldFetchSearch.moves && baseData.moves?.previous) {
      const data = await fetchAndMapMoves(baseData.moves.previous);
      setAllData({
        baseMoves: data.base,
        currentMoves: data.mapped,
        currentPage: {
          moves: currentPage.moves - 1,
        },
      });
    } else {
      const index = (currentPage.moves - 1) * resultsAmount.moves;
      const results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
      const currentMoves = results.slice(index - resultsAmount.moves, index);
      setAllData({
        currentMoves,
        currentPage: {
          moves: currentPage.moves - 1,
        },
      });
    }
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (page !== NaN) {
      if (shouldFetchSearch.moves) {
        const data = await fetchAndMapMoves(
          `${API.MOVE}?limit=${resultsAmount.moves}&offset=${
            page * resultsAmount.moves - resultsAmount.moves
          }`
        );
        setAllData({
          baseMoves: data.base,
          currentMoves: data.mapped,
          currentPage: {
            moves: page,
          },
        });
      } else {
        const index = page * resultsAmount.moves;
        const results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
        const currentMoves = results.slice(index - resultsAmount.moves, index);
        setAllData({
          currentMoves,
          currentPage: {
            moves: page,
          },
        });
      }
    }
  };

  const handleResultsAmount = async (resultsAmount: number) => {
    if (shouldFetchSearch.types) {
      const data = await fetchAndMapMoves(`${API.MOVE}?limit=${resultsAmount}`);
      setAllData({
        baseMoves: data.base,
        currentMoves: data.mapped,
        resultsAmount: {
          moves: resultsAmount,
        },
        currentPage: {
          moves: 1,
        },
      });
    } else {
      const results = searchResults.moves?.length ? searchResults.moves : allDataResults.moves;
      const currentMoves = results.slice(0, resultsAmount);
      setAllData({
        currentMoves,
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
      {!currentPageResults.moves.length && <S.TextCenter>No types found</S.TextCenter>}
      {isLoading && <Loader />}
      <S.CardsWrapper visible={!isLoading}>
        {currentPageResults.moves.map((move) => (
          <MoveCard key={move.id} move={move} />
        ))}
      </S.CardsWrapper>
    </S.MoveView>
  );
};
