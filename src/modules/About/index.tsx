import { Layout } from 'modules';
import * as S from './styled';
import React from 'react';

type Props = {
  componentName: string;
  location: string;
};

export class About extends React.Component<Props, unknown> {
  render() {
    const { componentName, location } = this.props;
    return (
      <Layout location={location} componentName={componentName}>
        <S.CommonView>
          <S.CommonMessage>About us page</S.CommonMessage>
        </S.CommonView>
      </Layout>
    );
  }
}
