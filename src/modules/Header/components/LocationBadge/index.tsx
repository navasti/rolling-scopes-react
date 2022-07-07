import * as S from './styled';
import React from 'react';

type Props = {
  componentName: string;
  location: string;
};

export class LocationBadge extends React.Component<Props, unknown> {
  render() {
    const { componentName, location } = this.props;
    return (
      <S.Badge>
        <S.Paragraph>
          Location: <S.Span>{location}</S.Span>
        </S.Paragraph>
        <S.Paragraph>
          Component: <S.Span>{componentName}</S.Span>
        </S.Paragraph>
      </S.Badge>
    );
  }
}
