import { createGlobalStyle } from 'styled-components';
import bg from '../assets/images/bg.svg';

const GlobalStyles = createGlobalStyle`
  :root {
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
  }
  html {
    background: url(${bg});
    background-size: 450px;
    font-size: 10px;
  }

  body {
    font-size: 1.7rem;
  }
`;

export default GlobalStyles;
