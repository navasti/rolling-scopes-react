import { ErrorMessage } from 'modules/Form/components';
import { CheckFields, ErrorsObject } from 'types';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  onChange: (field: CheckFields) => void;
  errors: ErrorsObject;
};

export const ConsentField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { errors, onChange } = props;
  return (
    <>
      <S.CheckboxField htmlFor={Fields.consent}>
        <input
          onChange={() => onChange(Fields.consent)}
          name={Fields.consent}
          id={Fields.consent}
          type="checkbox"
          ref={ref}
        />
        I have read and accept the regulations
      </S.CheckboxField>
      <ErrorMessage visible={!!errors.consent} message={errors.consent} />
    </>
  );
});
