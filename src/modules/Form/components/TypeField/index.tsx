import { ErrorMessage } from 'modules/Form/components';
import { ErrorsObject, TextFields } from 'types';
import { POKEMON_TYPES } from 'appConstants';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  onChange: (field: TextFields) => void;
  errors: ErrorsObject;
};

export const TypeField = forwardRef<HTMLSelectElement, Props>(({ errors, onChange }, ref) => {
  return (
    <>
      <S.CommonLabel htmlFor={Fields.type}>
        *Main type
        <select
          onChange={() => onChange(Fields.type)}
          name={Fields.type}
          id={Fields.type}
          ref={ref}
        >
          <option value=""></option>
          {POKEMON_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </S.CommonLabel>
      <ErrorMessage visible={!!errors.type} message={errors.type} />
    </>
  );
});
