import { Layout } from 'modules';
import * as S from './styled';
import React from 'react';

type Props = {
  componentName: string;
  location: string;
};

export const Forms = ({ componentName, location }: Props) => {
  return (
    <Layout location={location} componentName={componentName}>
      <S.CommonView>
        <form>form</form>
      </S.CommonView>
    </Layout>
  );
};
