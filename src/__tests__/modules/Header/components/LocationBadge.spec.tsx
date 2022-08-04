import { render, screen } from '@testing-library/react';
import { componentName, location } from '__mocks__';
import { LocationBadge } from 'modules';

const locationBadgeExpectations = () => {
  const locationParagraph = screen.getByText('Location:');
  const componentNameParagraph = screen.getByText('Component:');
  const locationSpan = screen.getByText(location);
  const componentNameSpan = screen.getByText(componentName);
  expect(locationParagraph).toBeVisible();
  expect(componentNameParagraph).toBeVisible();
  expect(locationParagraph).toContainElement(locationSpan);
  expect(componentNameParagraph).toContainElement(componentNameSpan);
};

it('Rendering location badge', () => {
  render(<LocationBadge location={location} componentName={componentName} />);
  locationBadgeExpectations();
});
