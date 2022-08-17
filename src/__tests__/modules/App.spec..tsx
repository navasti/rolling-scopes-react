import { fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter } from 'react-router-dom';
import { App } from 'modules';

jest.mock('modules', () => {
  const { App } = jest.requireActual('modules/App');
  return {
    __esModule: true,
    App,
    SearchPage: () => <p>SearchPage</p>,
    NotFound: () => <p>NotFound</p>,
    About: () => <p>About</p>,
    Form: () => <p>Form</p>,
  };
});

describe('App', () => {
  it('SearchPage should be rendered initially but changing path should render specific component', () => {
    const { container } = render(
      <>
        <div>
          <Link to="/about">about</Link>
          <Link to="/404">404</Link>
          <Link to="/form">form</Link>
          <Link to="/">search page</Link>
        </div>
        <App />
      </>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText('SearchPage')).toBeVisible();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          <a
            href="/about"
          >
            about
          </a>
          <a
            href="/404"
          >
            404
          </a>
          <a
            href="/form"
          >
            form
          </a>
          <a
            href="/"
          >
            search page
          </a>
        </div>
        <p>
          SearchPage
        </p>
      </div>
    `);
    fireEvent.click(screen.getByText('about'));
    expect(screen.getByText('About')).toBeVisible();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          <a
            href="/about"
          >
            about
          </a>
          <a
            href="/404"
          >
            404
          </a>
          <a
            href="/form"
          >
            form
          </a>
          <a
            href="/"
          >
            search page
          </a>
        </div>
        <p>
          About
        </p>
      </div>
    `);
    fireEvent.click(screen.getByText('404'));
    expect(screen.getByText('NotFound')).toBeVisible();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          <a
            href="/about"
          >
            about
          </a>
          <a
            href="/404"
          >
            404
          </a>
          <a
            href="/form"
          >
            form
          </a>
          <a
            href="/"
          >
            search page
          </a>
        </div>
        <p>
          NotFound
        </p>
      </div>
    `);
    fireEvent.click(screen.getByText('form'));
    expect(screen.getByText('Form')).toBeVisible();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          <a
            href="/about"
          >
            about
          </a>
          <a
            href="/404"
          >
            404
          </a>
          <a
            href="/form"
          >
            form
          </a>
          <a
            href="/"
          >
            search page
          </a>
        </div>
        <p>
          Form
        </p>
      </div>
    `);
  });
});
