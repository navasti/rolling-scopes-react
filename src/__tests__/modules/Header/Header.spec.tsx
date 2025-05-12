import { testingComponentName, testingLocation } from '__mocks__/data';
import { render, screen } from '@testing-library/react';
import { Header } from 'modules';

jest.mock('modules/Header/components', () => ({
  __esModule: true,
  Navigation: () => (
    <nav data-testid="navigation-mock">
      <div>
        <a href="/test">Test</a>
      </div>
    </nav>
  ),
  LocationBadge: ({ location, componentName }: { location: string; componentName: string }) => (
    <div data-testid="location-badge-mock">
      <p>
        Location: <span>{location}</span>
      </p>
      <p>
        Component: <span>{componentName}</span>
      </p>
    </div>
  ),
}));

describe('Header', () => {
  it('header should be rendered and consists of navigation and location badge', () => {
    const { container } = render(
      <Header componentName={testingComponentName} location={testingLocation} />
    );
    expect(container).toContainElement(screen.getByTestId('location-badge-mock'));
    expect(screen.getByTestId('location-badge-mock')).toBeInTheDocument();
    expect(screen.getByTestId('navigation-mock')).toBeInTheDocument();
  });
});
