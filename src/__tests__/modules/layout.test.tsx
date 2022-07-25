import { Layout } from 'modules';
import { BrowserRouter } from 'react-router-dom';
import { TestingElement, location } from '__mocks__';
import { render, screen } from '@testing-library/react';

describe('Layout module', () => {
  it('Rendering', () => {
    render(
      <Layout location={location} componentName="test">
        <TestingElement />
      </Layout>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('/about')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('testing element')).toBeInTheDocument();
  });
});
