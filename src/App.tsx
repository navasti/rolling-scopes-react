import { Route, Routes } from 'react-router-dom';
import { routes } from 'routes';
import React from 'react';

export class App extends React.Component {
  render() {
    return (
      <Routes>
        {routes.map(({ component, id, path }) => (
          <Route key={id} path={path} element={component} />
        ))}
      </Routes>
    );
  }
}
