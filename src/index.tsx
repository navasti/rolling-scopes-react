import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from 'commonStyles';
import ReactDOM from 'react-dom/client';
import { App } from 'modules';

import { GlobalContextProvider } from 'contexts/globalContext';
import {
  FormContextProvider,
  MoveContextProvider,
  PokemonContextProvider,
  SearchContextProvider,
  TypeContextProvider,
} from 'contexts';

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <GlobalStyles />
    <GlobalContextProvider>
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
    </GlobalContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
