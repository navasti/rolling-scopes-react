import { testingLocation, testingComponentName } from '__mocks__/data';
import { render, screen } from '@testing-library/react';
import { LocationBadge } from 'modules';

describe('LocationBadge', () => {
  it('location badge element should be rendered and match snapshot', () => {
    const { container } = render(
      <LocationBadge componentName={testingComponentName} location={testingLocation} />
    );
    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeInTheDocument();
  });
  it('location and component name should be rendered and visible', () => {
    render(<LocationBadge componentName={testingComponentName} location={testingLocation} />);
    expect(screen.getByText(testingComponentName)).toBeVisible();
    expect(screen.getByText(testingLocation)).toBeVisible();
  });
});
