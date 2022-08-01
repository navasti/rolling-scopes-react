import { FieldReturnType } from 'types';
import { Fields } from 'appConstants';
import { forwardRef } from 'react';
import * as S from './styled';

type Props = FieldReturnType<Fields.avatar>;

export const AvatarField = forwardRef<HTMLInputElement, Props>(({ name, onChange }, ref) => {
  return (
    <S.FileField>
      Avatar
      <input name={name} type="file" ref={ref} onChange={onChange} />
    </S.FileField>
  );
});
