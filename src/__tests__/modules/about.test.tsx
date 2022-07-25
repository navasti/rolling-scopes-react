import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { About } from 'modules';

describe('About module', () => {
  it('Rendering', () => {
    render(<About componentName="Any" location="/any" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText(/About us page/)).toBeInTheDocument();
    expect(screen.getByText('/any')).toBeInTheDocument();
  });
});
