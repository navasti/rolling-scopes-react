import { Layout } from 'modules';
import { testingComponentName, testingLocation } from '__mocks__/data';
// import { TestingElement, location } from '__mocks__';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('modules', () => {
  const {} = require('');
  const { Layout } = jest.requireActual('modules/Layout');
  return {
    __esModule: true,
    Layout,
    Header: ({ componentName, location }: { componentName: string; location: string }) => {
      return (
        <header>
          <nav data-testid="navigation-mock">
            <div>
              <a href="/test">testing link</a>
            </div>
          </nav>
          <div data-testid="location-badge-mock">
            <p>
              Location:
              <span>{location}</span>
            </p>
            <p>
              Component:
              <span>{componentName}</span>
            </p>
          </div>
        </header>
      );
    },
  };
});

describe('Layout', () => {
  it('layout should match snapshot and display header and main with passed children', () => {
    const { container } = render(
      <Layout location={testingLocation} componentName={testingComponentName}>
        <p>testing children</p>
      </Layout>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByText(testingLocation)).toBeVisible();
    expect(screen.getByText('testing children')).toBeVisible();
    expect(screen.getByTestId('navigation-mock')).toBeVisible();
    expect(screen.getByText(testingComponentName)).toBeVisible();
    expect(screen.getByTestId('location-badge-mock')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
