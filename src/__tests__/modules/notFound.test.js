import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from 'modules';

describe('NotFound module', () => {
  it('Rendering', () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByText(/404/)).toBeVisible();
  });
});
