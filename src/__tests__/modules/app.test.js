import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { App } from 'modules';

describe('App module', () => {
  it('Rendering', () => {
    render(<App />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('SearchPage')).toBeInTheDocument();
  });
});
