import { useSearchContext } from 'contexts';
import { ChangeEvent, useRef } from 'react';
import { Sorting } from 'types';

export const SortingSelector = () => {
  const select = useRef<HTMLSelectElement>(null);

  const {
    searchState: { sorting },
    setSorting,
  } = useSearchContext();

  const onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setSorting(value as Sorting);
  };

  return (
    <div>
      <label htmlFor="sorting">Sorting</label>
      <select value={sorting} onChange={onChange} ref={select} name="sorting" id="sorting">
        <option value={Sorting.order}>{Sorting.order}</option>
        <option value={Sorting.alphabetical}>{Sorting.alphabetical}</option>
        <option value={Sorting.power}>{Sorting.power}</option>
        <option value={Sorting.type}>{Sorting.type}</option>
      </select>
    </div>
  );
};
