import { location, componentName, links } from '__mocks__';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Header } from 'modules';

jest.mock('modules/Tescik/components', () => ({
  __esModule: true,
  TescikChild: () => <p data-testid="jazda">jazda</p>,
}));

jest.mock('components', () => ({
  __esModule: true,
  Loader: () => <p data-testid="loader">loading</p>,
}));

const headerExpectations = () => {
  const nav = screen.getByRole('navigation');
  nav.childNodes.forEach((child, idx) => {
    const { childNodes } = child;
    expect(childNodes.length).toEqual(1);
    expect(childNodes[0].textContent).toEqual(links[idx]);
  });
  expect(nav.childNodes.length).toEqual(links.length);
};

// const routingExpectations = async () => {
//   const user = userEvent.setup();
//   expect(screen.getByText(location)).toBeInTheDocument();
//   await user.click(screen.getByText(links[0]));
//   expect(screen.getByText('SearchPage')).toBeInTheDocument();
// };

describe('Header', () => {
  it('Rendering header', () => {
    render(<Header location={location} componentName={componentName} />, {
      wrapper: BrowserRouter,
    });
    headerExpectations();
  });
  // it('Routing', () => {
  //   render(<Header location={location} componentName={componentName} />, {
  //     wrapper: BrowserRouter,
  //   });
  //   routingExpectations();
  // });
});
