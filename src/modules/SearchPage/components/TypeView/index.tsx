import { SortingSelector, ResultsSelector, Pagination } from 'modules/SearchPage/components';
import { useGlobalData, useResources } from 'hooks';
import { TypeCard } from './components/TypeCard';
import { RESULTS_AMOUNT } from 'appConstants';
import { useAppContext } from 'contexts';
import { Loader } from 'components';
import { TypeSorting } from 'types';
import * as S from './styled';

export const TypeView = () => {
  const { handleSorting, handleResultsAmount, nextPage, previousPage, specificPage } =
    useResources('types');
  const { totalPageCounts } = useGlobalData();
  const options = Object.values(TypeSorting);
  const { state } = useAppContext();

  return (
    <S.TypeView>
      <S.SelectorsWrapper>
        <SortingSelector
          name="type"
          options={options}
          value={state.sorting.types}
          onChange={handleSorting}
        />
        <ResultsSelector
          options={RESULTS_AMOUNT.TYPE}
          onClick={handleResultsAmount}
          value={state.resultsAmount.types}
        />
      </S.SelectorsWrapper>
      <Pagination
        totalPageCount={totalPageCounts.types}
        currentPage={state.currentPage.types}
        previousPage={previousPage}
        specificPage={specificPage}
        nextPage={nextPage}
      />
      {!state.currentPageResults.types?.length && <S.TextCenter>No types found</S.TextCenter>}
      {state.isLoading && <Loader />}
      <S.CardsWrapper visible={!state.isLoading}>
        {state.currentPageResults.types.map((type) => (
          <TypeCard key={type.id} type={type} />
        ))}
      </S.CardsWrapper>
    </S.TypeView>
  );
};
