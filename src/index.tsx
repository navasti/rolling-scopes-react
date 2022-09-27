import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from 'commonStyles';
import ReactDOM from 'react-dom/client';
import { AppProvider } from 'contexts';
import { App } from 'modules';

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);

root.render(
  <BrowserRouter>
    <GlobalStyles />
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);

reportWebVitals();
