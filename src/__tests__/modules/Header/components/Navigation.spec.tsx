import { Navigation } from 'modules/Header/components';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LINKS } from 'appConstants';
import { capitalize } from 'utils';

describe('Navigation', () => {
  it('navigation component should render links and match snapshot', () => {
    const { container } = render(<Navigation />, { wrapper: BrowserRouter });
    expect(container).not.toBeEmptyDOMElement();
    LINKS.forEach((link) => expect(screen.getByText(capitalize(link))).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });
  it('navigation links should change the route', () => {
    const { container } = render(<Navigation />, { wrapper: BrowserRouter });
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(LINKS.length);
    for (let i = 0; i <= LINKS.length - 1; i++) {
      expect(links[i]).toHaveAttribute('href', `/${LINKS[i] === 'home' ? '' : LINKS[i]}`);
    }
  });
});
