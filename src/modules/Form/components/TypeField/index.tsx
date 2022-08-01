import { FieldReturnType, MessageType } from 'types';
import { POKEMON_TYPES } from 'appConstants';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import { Message } from 'modules';
import * as S from './styled';

type Props = FieldReturnType<Fields.type>;

export const TypeField = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { error, name, onChange } = props;
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
