import { ErrorMessage } from 'modules/Form/components';
import { ErrorsObject, TextFields } from 'types';
import { Fields } from 'appConstants';
import { getTodayDate } from 'utils';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  onChange: (field: TextFields) => void;
  errors: ErrorsObject;
};

export const BirthdayField = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { errors, onChange } = props;
  return (
    <>
      <S.CommonLabel htmlFor={Fields.birthday}>
        *Birthday
        <input
          onChange={() => onChange(Fields.birthday)}
          max={getTodayDate()}
          name={Fields.birthday}
          id={Fields.birthday}
          type="date"
          ref={ref}
        />
      </S.CommonLabel>
      <ErrorMessage visible={!!errors.birthday} message={errors.birthday} />
    </>
  );
});
