import { ErrorMessage } from 'modules/Form/components';
import { FIELDS, TEXT_FIELDS } from 'appConstants';
import { getTodayDate } from 'utils';
import { ErrorsObject } from 'types';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  onChange: (field: TEXT_FIELDS) => void;
  errors: ErrorsObject;
};

export const BirthdayField = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { errors, onChange } = props;
  return (
    <>
      <S.CommonLabel htmlFor={FIELDS.birthday}>
        *Birthday
        <input
          onChange={() => onChange(FIELDS.birthday)}
          max={getTodayDate()}
          name={FIELDS.birthday}
          id={FIELDS.birthday}
          type="date"
          ref={ref}
        />
      </S.CommonLabel>
      <ErrorMessage visible={!!errors.birthday} message={errors.birthday} />
    </>
  );
});
