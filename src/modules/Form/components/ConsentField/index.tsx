import { FieldReturnType, MessageType } from 'types';
import { Message } from 'modules/Form/components';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = FieldReturnType<Fields.consent>;

export const ConsentField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { name, error, onChange } = props;
  return (
    <>
      <S.CheckboxField htmlFor={name}>
        <input onChange={onChange} id={name} name={name} type="checkbox" ref={ref} />I have read and
        accept the regulations
      </S.CheckboxField>
      <Message center visible={!!error} message={error || ''} type={MessageType.error} />
    </>
  );
});
