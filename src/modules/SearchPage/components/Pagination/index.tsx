import { usePaginationRange, DOTS } from 'hooks';
import { MouseEvent } from 'react';
import * as S from './styled';

type Props = {
  currentPage: number;
  totalPageCount: number;
  nextPage: () => void;
  previousPage: () => void;
  specificPage: (event: MouseEvent<HTMLButtonElement>) => void;
};
export const Pagination = (props: Props) => {
  const { totalPageCount, currentPage, nextPage, previousPage, specificPage } = props;
  const paginationRange = usePaginationRange({
    totalPageCount,
    currentPage,
  });

  return (
    <S.Pagination>
      <S.PaginationButton onClick={previousPage} disabled={currentPage === 1}>
        👈
      </S.PaginationButton>

      {paginationRange?.map((item, index) =>
        item === DOTS ? (
          <S.PaginationButton key={index}>{DOTS}</S.PaginationButton>
        ) : (
          <S.PaginationButton key={index} onClick={specificPage} active={currentPage === item}>
            <span>{item}</span>
          </S.PaginationButton>
        )
      )}

      <S.PaginationButton onClick={nextPage} disabled={currentPage === totalPageCount}>
        👉
      </S.PaginationButton>
    </S.Pagination>
  );
};
