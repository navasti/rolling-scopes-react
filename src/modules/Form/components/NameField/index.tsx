import { FieldReturnType, MessageType } from 'types';
import { Message } from 'modules/Form/components';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = FieldReturnType<Fields.name>;

export const NameField = forwardRef<HTMLInputElement, Props>(({ name, error, onChange }, ref) => {
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
