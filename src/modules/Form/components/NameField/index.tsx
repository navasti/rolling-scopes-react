import { ErrorMessage } from 'modules/Form/components';
import { ErrorsObject, TextFields } from 'types';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  onChange: (field: TextFields) => void;
  errors: ErrorsObject;
};

export const NameField = forwardRef<HTMLInputElement, Props>(({ errors, onChange }, ref) => {
  return (
    <>
      <S.CommonLabel htmlFor={Fields.name}>
        *Name
        <input
          onChange={() => onChange(Fields.name)}
          placeholder={Fields.name}
          name={Fields.name}
          id={Fields.name}
          type="text"
          ref={ref}
        />
      </S.CommonLabel>
      <ErrorMessage visible={!!errors.name} message={errors.name} />
    </>
  );
});
