import { render, screen } from '@testing-library/react';
import { Loader } from 'components';

describe('Loader component', () => {
  it('Rendering', () => {
    render(<Loader />);
    expect(screen.getByTitle('loader')).toBeInTheDocument();
    expect(screen.getByTitle('loader')).toBeVisible();
  });
});
