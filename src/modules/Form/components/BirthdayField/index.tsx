import { FieldReturnType, MessageType } from 'types';
import { Message } from 'modules/Form/components';
import { Fields } from 'appConstants';
import { getTodayDate } from 'utils';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = FieldReturnType<Fields.birthday>;

export const BirthdayField = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { name, error, maxDate, onChange } = props;
  return (
    <>
      <S.CommonLabel>
        *Birthday
        <input
          max={maxDate || getTodayDate()}
          onChange={onChange}
          name={name}
          type="date"
          ref={ref}
        />
      </S.CommonLabel>
      <Message visible={!!error} message={error || ''} type={MessageType.error} />
    </>
  );
});
