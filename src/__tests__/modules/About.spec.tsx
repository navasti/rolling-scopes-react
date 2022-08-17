import { testingComponentName, testingLocation } from '__mocks__/data';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { About } from 'modules';

jest.mock('modules', () => {
  const { ComponentMocks } = require('__mocks__/elements.tsx');
  const { About } = jest.requireActual('modules/About');
  return {
    __esModule: true,
    About,
    Layout: ComponentMocks.Layout,
  };
});

describe('About', () => {
  it('component should match snapshot and about us page text should be visible', () => {
    const { container } = render(
      <About componentName={testingComponentName} location={testingLocation} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(screen.getByTestId('component-mock')).toHaveTextContent(testingComponentName);
    expect(screen.getByTestId('location-mock')).toHaveTextContent(testingLocation);
    expect(screen.getByText('About us page')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
