import { Layout } from 'modules';
import * as S from './styled';
import React from 'react';

type Props = {
  componentName: string;
  location: string;
};
export class NotFound extends React.Component<Props, unknown> {
  render() {
    const { componentName, location } = this.props;
    return (
      <Layout componentName={componentName} location={location}>
        <S.CommonView>
          <S.CommonMessage>404. Unfortunately page was not found</S.CommonMessage>
        </S.CommonView>
      </Layout>
    );
  }
}
