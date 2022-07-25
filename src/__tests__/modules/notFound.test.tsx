import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from 'modules';

describe('NotFound module', () => {
  it('Rendering', () => {
    render(<NotFound componentName="test" location="/404" />, { wrapper: BrowserRouter });
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    const locationElement = screen.getByText('/404');
    expect(locationElement).toBeInTheDocument();
    expect(locationElement).toBeVisible();
    expect(screen.getByText(/404. Unfortunately page was not found/)).toBeInTheDocument();
    expect(screen.getByText(/404. Unfortunately page was not found/)).toBeVisible();
  });
});
