import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Layout } from 'modules';

describe('Layout module', () => {
  it('Rendering', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
