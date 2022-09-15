import { BrowserRouter } from 'react-router-dom';
import { GlobalContextProvider } from 'contexts';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from 'commonStyles';
import ReactDOM from 'react-dom/client';
import { App } from 'modules';
// import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <GlobalStyles />
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
