import * as S from './styled';
import React from 'react';

type Props = {
  componentName: string;
  location: string;
};

export const LocationBadge = ({ componentName, location }: Props) => {
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
};
