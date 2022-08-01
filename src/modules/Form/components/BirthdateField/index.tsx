import { FieldReturnType, MessageType } from 'types';
import { Fields } from 'appConstants';
import { getTodayDate } from 'utils';
import { forwardRef } from 'react';
import { Message } from 'modules';
import * as S from './styled';

type Props = FieldReturnType<Fields.birthday>;

export const BirthdayField = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { name, error, onChange } = props;
  return (
    <>
      <S.CommonLabel>
        *Birthday
        <input onChange={onChange} max={getTodayDate()} name={name} type="date" ref={ref} />
      </S.CommonLabel>
      <Message visible={!!error} message={error || ''} type={MessageType.error} />
    </>
  );
});
