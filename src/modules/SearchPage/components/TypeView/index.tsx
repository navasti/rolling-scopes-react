import { useSearchContext, useTypeContext } from 'contexts';
import { SortingSelector } from '../SortingSelector';
import { TypeCard } from './components/TypeCard';
import { API, Limits } from 'appConstants';
import { Pagination } from '../Pagination';
import { fetchAndMapTypes } from 'utils';
import { Loader } from 'components';
import { useTypeData } from 'hooks';
import { MouseEvent } from 'react';
import * as S from './styled';
import { TypeSorting } from 'types';

export const TypeView = () => {
  const {
    setSorting,
    setBaseData,
    setCurrentPage,
    setAllDataResults,
    setCurrentPageResults,
    typeState: { currentPage, baseData, currentPageResults, allDataResults, sorting },
  } = useTypeContext();

  const {
    totalPageCount,
    shouldFetchPagination,
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
    if (sorting === TypeSorting.none) {
      fetchAndMapTypes(`${API.TYPE}${API.TYPE_LIMIT}`).then((types) => {
        const { base, mapped } = types;
        if (base) {
          setBaseData(base);
          setSorting(sorting);
          setCurrentPageResults(mapped);
        }
        setCurrentPage(1);
      });
    } else {
      const sorted = sort(sorting as TypeSorting);
      const results = sorted?.slice(0, Limits.type);
      if (sorted && results) {
        setSorting(sorting as TypeSorting);
        setCurrentPageResults(results);
        setAllDataResults(sorted);
        setCurrentPage(1);
      }
    }
  };

  const nextPage = async () => {
    if (shouldFetchPagination && baseData.next) {
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
      const index = currentPage * Limits.type;
      const results = allDataResults.slice(index, index + Limits.type);
      setCurrentPageResults(results);
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = async () => {
    if (shouldFetchPagination && baseData.previous) {
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
      const index = (currentPage - 1) * Limits.type;
      const results = allDataResults.slice(index - Limits.type, index);
      setCurrentPageResults(results);
      setCurrentPage(currentPage - 1);
    }
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (page !== NaN) {
      if (shouldFetchPagination) {
        setIsLoading(true);
        fetchAndMapTypes(`${API.TYPE}${API.TYPE_LIMIT}&${API.getTypesOffset(page)}`).then(
          (types) => {
            const { base, mapped } = types;
            if (base) {
              setBaseData(base);
              setCurrentPageResults(mapped);
            }
            setCurrentPage(page);
            setIsLoading(false);
          }
        );
      } else {
        const index = page * Limits.type;
        const results = allDataResults.slice(index - Limits.type, index);
        setCurrentPageResults(results);
        setCurrentPage(page);
      }
    }
  };

  return (
    <S.TypeView>
      <Pagination
        totalPageCount={totalPageCount}
        previousPage={previousPage}
        specificPage={specificPage}
        currentPage={currentPage}
        nextPage={nextPage}
      />
      <SortingSelector name="type" onChange={handleSorting} options={options} value={sorting} />
      <S.CardsWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          currentPageResults.map((type) => <TypeCard key={type.id} type={type} />)
        )}
      </S.CardsWrapper>
    </S.TypeView>
  );
};
