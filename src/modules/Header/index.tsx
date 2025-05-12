import { LocationBadge, Navigation } from './components';
import * as S from './styled';

type Props = {
  componentName: string;
  location: string;
};

export const Header = ({ componentName, location }: Props) => (
  <S.Header>
    <Navigation />
    <LocationBadge componentName={componentName} location={location} />
  </S.Header>
);
