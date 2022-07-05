import { Route, Routes } from 'react-router-dom';
import { routes } from './Routes';
import React from 'react';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Routes>
          {routes.map(({ component, id, path }) => (
            <Route key={id} path={path} element={component} />
          ))}
        </Routes>
      </div>
    );
  }
}
