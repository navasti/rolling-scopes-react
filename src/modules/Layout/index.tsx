import { Header } from 'modules';
import * as S from './styled';
import React from 'react';

type Props = {
  children: JSX.Element;
  componentName: string;
  location: string;
};

export class Layout extends React.Component<Props, unknown> {
  render() {
    const { children, componentName, location } = this.props;
    return (
      <S.LayoutWrapper>
        <Header location={location} componentName={componentName} />
        <S.Main role="main">{children}</S.Main>
      </S.LayoutWrapper>
    );
  }
}
