import { Header } from 'modules';
import * as S from './styled';
import React from 'react';

type Props = {
  children: JSX.Element;
  componentName: string;
  location: string;
};

export const Layout = (props: Props) => {
  const { children, componentName, location } = props;
  return (
    <S.LayoutWrapper>
      <Header location={location} componentName={componentName} />
      <main role="main">{children}</main>
    </S.LayoutWrapper>
  );
};
