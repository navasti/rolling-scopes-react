import { About, Home, NotFound } from 'views';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Page } from 'components';

interface Route {
  component: ReactNode;
  path: string;
  id: string;
}

export const routes: Array<Route> = [
  {
    id: '1',
    path: '/',
    component: (
      <Page location="/" componentName="Home">
        <Home />
      </Page>
    ),
  },
  {
    id: '2',
    path: '/about',
    component: (
      <Page location="/about" componentName="About">
        <About />
      </Page>
    ),
  },
  {
    id: '3',
    path: '/404',
    component: (
      <Page location="/404" componentName="NotFound">
        <NotFound />
      </Page>
    ),
  },
  {
    id: '4',
    path: '*',
    component: <Navigate to="/404" replace />,
  },
];
