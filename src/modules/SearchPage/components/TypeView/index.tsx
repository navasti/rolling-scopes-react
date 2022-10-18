import { SortingSelector, ResultsSelector, Pagination } from 'modules/SearchPage/components';
import { useResources, useAppSelector } from 'hooks';
import { TypeCard } from './components/TypeCard';
import { RESULTS_AMOUNT } from 'appConstants';
import { TypeSorting } from 'types';
import { Loader } from 'components';
import * as S from './styled';

export const TypeView = () => {
  const options = Object.values(TypeSorting);

  const { typeResultsAmount, currentTypes, typeSorting, currentTypePage } = useAppSelector(
    (state) => state.resources
  );
  const {
    isLoading,
    totalTypePages,
    handleTypeSorting,
    handleNextTypePage,
    handleSpecificTypePage,
    handlePreviousTypePage,
    handleTypesResultsAmount,
  } = useResources();

  return (
    <S.TypeView>
      <S.SelectorsWrapper>
        <SortingSelector
          name="type"
          options={options}
          value={typeSorting}
          onChange={handleTypeSorting}
        />
        <ResultsSelector
          onClick={handleTypesResultsAmount}
          options={RESULTS_AMOUNT.TYPE}
          value={typeResultsAmount}
        />
      </S.SelectorsWrapper>
      <Pagination
        currentPage={currentTypePage}
        totalPageCount={totalTypePages}
        previousPage={handlePreviousTypePage}
        specificPage={handleSpecificTypePage}
        nextPage={handleNextTypePage}
      />
      {!currentTypes?.length && !isLoading && <S.TextCenter>No types found</S.TextCenter>}
      {isLoading ? (
        <Loader />
      ) : (
        <S.CardsWrapper>
          {currentTypes.map((type) => (
            <TypeCard key={type.id} type={type} />
          ))}
        </S.CardsWrapper>
      )}
    </S.TypeView>
  );
};
