import { SortingSelector, ResultsSelector, Pagination } from 'modules/SearchPage/components';
import { useResources, useAppSelector } from 'hooks';
import { MoveCard } from './components/MoveCard';
import { RESULTS_AMOUNT } from 'appConstants';
import { MoveSorting } from 'types';
import { Loader } from 'components';
import * as S from './styled';

export const MoveView = () => {
  const options = Object.values(MoveSorting);

  const { moveSorting, currentMoves, currentMovePage, moveResultsAmount } = useAppSelector(
    (state) => state.resources
  );

  const {
    isLoading,
    totalMovePages,
    handleMoveSorting,
    handleNextMovePage,
    handleSpecificMovePage,
    handlePreviousMovePage,
    handleMoveResultsAmount,
  } = useResources();

  return (
    <S.MoveView>
      <S.SelectorsWrapper>
        <SortingSelector
          onChange={handleMoveSorting}
          value={moveSorting}
          options={options}
          name="move"
        />
        <ResultsSelector
          onClick={handleMoveResultsAmount}
          options={RESULTS_AMOUNT.MOVE}
          value={moveResultsAmount}
        />
      </S.SelectorsWrapper>
      <Pagination
        previousPage={handlePreviousMovePage}
        specificPage={handleSpecificMovePage}
        totalPageCount={totalMovePages}
        currentPage={currentMovePage}
        nextPage={handleNextMovePage}
      />
      {!currentMoves.length && !isLoading && <S.TextCenter>No moves found</S.TextCenter>}
      {isLoading ? (
        <Loader />
      ) : (
        <S.CardsWrapper>
          {currentMoves.map((move) => (
            <MoveCard key={move.id} move={move} />
          ))}
        </S.CardsWrapper>
      )}
    </S.MoveView>
  );
};
