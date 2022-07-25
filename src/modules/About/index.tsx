import { Layout } from 'modules';
import * as S from './styled';
import React from 'react';

type Props = {
  componentName: string;
  location: string;
};

export const About = ({ componentName, location }: Props) => {
  return (
    <Layout location={location} componentName={componentName}>
      <S.CommonView>
        <S.CommonMessage>About us page</S.CommonMessage>
      </S.CommonView>
    </Layout>
  );
};
