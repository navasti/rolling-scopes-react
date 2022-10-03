import * as S from './styled';

type Props = {
  value: number;
  options: Array<number>;
  onClick: (sorting: number) => void;
};

export const ResultsSelector = ({ value, options, onClick }: Props) => {
  return (
    <S.SelectorWrapper>
      <S.Label>Results:</S.Label>
      {options.map((option) => (
        <S.Option key={option} onClick={() => onClick(option)} active={value === option}>
          {option}
        </S.Option>
      ))}
    </S.SelectorWrapper>
  );
};
