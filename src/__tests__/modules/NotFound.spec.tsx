import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from 'modules';

jest.mock('modules', () => {
  const { ComponentMocks } = require('__mocks__/elements.tsx');
  const { NotFound } = jest.requireActual('modules/NotFound');
  return {
    __esModule: true,
    NotFound,
    Layout: ComponentMocks.Layout,
  };
});

describe('NotFound', () => {
  it('component should match snapshot and not found text should be visible', () => {
    const { container } = render(<NotFound componentName="NotFound" location="/404" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByTestId('component-mock')).toHaveTextContent('NotFound');
    expect(screen.getByTestId('location-mock')).toHaveTextContent('/404');
    expect(screen.getByText('404. Unfortunately page was not found')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
