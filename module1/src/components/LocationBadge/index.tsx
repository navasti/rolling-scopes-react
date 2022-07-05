import * as Styled from './styled';
import React from 'react';

interface Props {
  componentName: string;
  location: string;
}

export class LocationBadge extends React.Component<Props, unknown> {
  constructor(props: Props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <Styled.Badge>
        <Styled.Paragraph>
          Location: <Styled.Span>{this.props.location}</Styled.Span>
        </Styled.Paragraph>
        <Styled.Paragraph>
          Component: <Styled.Span>{this.props.componentName}</Styled.Span>
        </Styled.Paragraph>
      </Styled.Badge>
    );
  }
}
