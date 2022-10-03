import { MoveSorting, PokemonSorting, TypeSorting } from 'types';
import * as S from './styled';

type Props = {
  name: string;
  value: string;
  options: Array<string>;
  onChange: (sorting: PokemonSorting | MoveSorting | TypeSorting) => void;
};

export const SortingSelector = ({ name, options, value, onChange }: Props) => {
  return (
    <S.SelectorWrapper>
      <S.Label htmlFor={name}>Sort {name}</S.Label>
      <S.Select
        value={value}
        onChange={({ target: { value } }) =>
          onChange(value as PokemonSorting | MoveSorting | TypeSorting)
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
