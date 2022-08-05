import { testingComponentName, testingLocation } from '__mocks__';
import { render, screen } from '@testing-library/react';
import { Header } from 'modules';

jest.mock('modules/Header/components', () => ({
  __esModule: true,
  Navigation: () => (
    <nav data-testid="navigation">
      <div>
        <a href="/test">Test</a>
      </div>
    </nav>
  ),
  LocationBadge: ({ location, componentName }: { location: string; componentName: string }) => (
    <div data-testid="location-badge">
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
    expect((container.querySelector('header') as HTMLElement).children).toHaveLength(2);
    expect(screen.getByTestId('location-badge')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });
});
