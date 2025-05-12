import { createGlobalStyle } from 'styled-components';
import './normalize.css';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html {
    font-family: 'Arial', sans-serif;
  }
`;
