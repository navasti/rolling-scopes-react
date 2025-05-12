import { FieldReturnType, MessageType } from 'types';
import { Message } from 'modules/Form/components';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = FieldReturnType<Fields.avatar>;

export const AvatarField = forwardRef<HTMLInputElement, Props>(({ name, error, onChange }, ref) => {
  return (
    <>
      <S.FileField htmlFor="avatar">
        Avatar
        <input name={name} id="avatar" type="file" ref={ref} onChange={onChange} />
      </S.FileField>
      <Message visible={!!error} message={error || ''} type={MessageType.error} center />
    </>
  );
});
