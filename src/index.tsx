import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from 'commonStyles';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'toolkit';
import { App } from 'modules';

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);

root.render(
  <BrowserRouter>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
