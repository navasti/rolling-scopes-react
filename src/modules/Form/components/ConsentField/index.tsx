import { CHECK_FIELDS, FIELDS } from 'appConstants';
import { ErrorMessage } from '../ErrorMessage';
import { ErrorsObject } from 'types';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  onChange: (field: CHECK_FIELDS) => void;
  errors: ErrorsObject;
};

export const ConsentField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { errors, onChange } = props;
  return (
    <>
      <S.CheckboxField htmlFor={FIELDS.consent}>
        <input
          onChange={() => onChange(FIELDS.consent)}
          name={FIELDS.consent}
          id={FIELDS.consent}
          type="checkbox"
          ref={ref}
        />
        I have read and accept the regulations
      </S.CheckboxField>
      <ErrorMessage visible={!!errors.consent} message={errors.consent} />
    </>
  );
});
