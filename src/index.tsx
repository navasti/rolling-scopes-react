import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from 'commonStyles';
import ReactDOM from 'react-dom/client';
import { App } from 'modules';
import React from 'react';
import {
  MoveContextProvider,
  TypeContextProvider,
  FormContextProvider,
  SearchContextProvider,
  PokemonContextProvider,
} from 'contexts';

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <SearchContextProvider>
        <MoveContextProvider>
          <PokemonContextProvider>
            <TypeContextProvider>
              <FormContextProvider>
                <App />
              </FormContextProvider>
            </TypeContextProvider>
          </PokemonContextProvider>
        </MoveContextProvider>
      </SearchContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
