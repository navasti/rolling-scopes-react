import { LocationBadge } from 'components/Header/components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Header } from 'components';

const links = ['Home', 'About', 'Invalid'];
const componentName = 'About';
const location = '/about';

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

const headerExpectations = () => {
  const nav = screen.getByRole('navigation');
  nav.childNodes.forEach((child, idx) => {
    const { childNodes } = child;
    expect(childNodes.length).toEqual(1);
    expect(childNodes[0].textContent).toEqual(links[idx]);
  });
  expect(nav.childNodes.length).toEqual(3);
};

const routingExpectations = async () => {
  const user = userEvent.setup();
  expect(screen.getByText(location)).toBeInTheDocument();
  await user.click(screen.getByText(links[0]));
  expect(screen.getByText(links[0])).toBeInTheDocument();
};

describe('Testing header and related components', () => {
  it('Rendering location badge component', () => {
    render(<LocationBadge location={location} componentName={componentName} />);
    locationBadgeExpectations();
  });
  it('Rendering header component', () => {
    render(<Header location={location} componentName={componentName} />, {
      wrapper: BrowserRouter,
    });
    headerExpectations();
  });
  it('Routing', () => {
    render(<Header location={location} componentName={componentName} />, {
      wrapper: BrowserRouter,
    });
    routingExpectations();
  });
});
