import { MoveSorting, PokemonSorting, TypeSorting } from 'types';
import * as S from './styled';

type Props = {
  name: string;
  value: string;
  options: Array<string>;
  onChange: (sorting: MoveSorting | TypeSorting | PokemonSorting) => void;
};

export const SortingSelector = ({ name, options, value, onChange }: Props) => {
  return (
    <S.SelectorWrapper>
      <S.Label htmlFor={name}>Sort {name}</S.Label>
      <S.Select
        value={value}
        onChange={({ target: { value } }) =>
          onChange(value as MoveSorting | TypeSorting | MoveSorting)
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </S.Select>
    </S.SelectorWrapper>
  );
};
