import { SortingSelector, ResultsSelector, Pagination } from 'modules/SearchPage/components';
import { useGlobalData, useResources } from 'hooks';
import { MoveCard } from './components/MoveCard';
import { RESULTS_AMOUNT } from 'appConstants';
import { useAppContext } from 'contexts';
import { MoveSorting } from 'types';
import { Loader } from 'components';
import * as S from './styled';

export const MoveView = () => {
  const { handleSorting, handleResultsAmount, nextPage, previousPage, specificPage } =
    useResources('moves');
  const { totalPageCounts } = useGlobalData();
  const options = Object.values(MoveSorting);
  const { state } = useAppContext();

  return (
    <S.MoveView>
      <S.SelectorsWrapper>
        <SortingSelector
          onChange={handleSorting}
          value={state.sorting.moves}
          options={options}
          name="move"
        />
        <ResultsSelector
          options={RESULTS_AMOUNT.MOVE}
          onClick={handleResultsAmount}
          value={state.resultsAmount.moves}
        />
      </S.SelectorsWrapper>
      <Pagination
        totalPageCount={totalPageCounts.moves}
        currentPage={state.currentPage.moves}
        previousPage={previousPage}
        specificPage={specificPage}
        nextPage={nextPage}
      />
      {!state.currentPageResults.moves.length && <S.TextCenter>No moves found</S.TextCenter>}
      {state.isLoading && <Loader />}
      <S.CardsWrapper visible={!state.isLoading}>
        {state.currentPageResults.moves.map((move) => (
          <MoveCard key={move.id} move={move} />
        ))}
      </S.CardsWrapper>
    </S.MoveView>
  );
};
