import { FIELDS, TEXT_FIELDS } from 'appConstants';
import { ErrorMessage } from '../index';
import { ErrorsObject } from 'types';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  onChange: (field: TEXT_FIELDS) => void;
  errors: ErrorsObject;
};

export const NameField = forwardRef<HTMLInputElement, Props>(({ errors, onChange }, ref) => {
  return (
    <>
      <S.CommonLabel htmlFor={FIELDS.name}>
        *Name
        <input
          onChange={() => onChange(FIELDS.name)}
          placeholder={FIELDS.name}
          name={FIELDS.name}
          id={FIELDS.name}
          type="text"
          ref={ref}
        />
      </S.CommonLabel>
      <ErrorMessage visible={!!errors.name} message={errors.name} />
    </>
  );
});
