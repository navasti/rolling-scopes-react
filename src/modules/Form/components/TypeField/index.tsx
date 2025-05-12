import { FieldReturnType, MessageType } from 'types';
import { POKEMON_TYPES, Fields } from 'appConstants';
import { Message } from 'modules/Form/components';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = FieldReturnType<Fields.type>;

export const TypeField = forwardRef<HTMLSelectElement, Props>(({ error, name, onChange }, ref) => {
  return (
    <>
      <S.CommonLabel htmlFor={name}>
        *Main type
        <select onChange={onChange} name={name} ref={ref} id={name}>
          <option value=""></option>
          {POKEMON_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </S.CommonLabel>
      <Message visible={!!error} message={error || ''} type={MessageType.error} />
    </>
  );
});
