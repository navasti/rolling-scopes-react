import { render } from '@testing-library/react';
import { Loader } from 'components';

describe('Loader', () => {
  it('loader component should be visible and match snapshot', () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
    expect(container).toBeVisible();
  });
});
