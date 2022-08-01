import { FieldReturnType, MessageType } from 'types';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import { Message } from 'modules';
import * as S from './styled';

type Props = FieldReturnType<Fields.name>;

export const NameField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, error, onChange } = props;
  return (
    <>
      <S.CommonLabel htmlFor={name}>
        *Name
        <input
          placeholder={Fields.name}
          onChange={onChange}
          name={name}
          type="text"
          id={name}
          ref={ref}
        />
      </S.CommonLabel>
      <Message visible={!!error} message={error || ''} type={MessageType.error} />
    </>
  );
});
