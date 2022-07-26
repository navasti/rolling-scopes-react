import { POKEMON_TYPES, TEXT_FIELDS } from 'appConstants';
import { ErrorMessage } from 'modules/Form/components';
import { FIELDS } from 'appConstants';
import { ErrorsObject } from 'types';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = {
  onChange: (field: TEXT_FIELDS) => void;
  errors: ErrorsObject;
};

export const TypeField = forwardRef<HTMLSelectElement, Props>(({ errors, onChange }, ref) => {
  return (
    <>
      <S.CommonLabel htmlFor={FIELDS.type}>
        *Main type
        <select
          onChange={() => onChange(FIELDS.type)}
          name={FIELDS.type}
          id={FIELDS.type}
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
