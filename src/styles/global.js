import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    /* Light theme default */
    --background: #f8fafc;
    --text: #1a1a1a;
    --primary: #2c3e50;
    --secondary: #64748b;
    --accent1: #6e8efb;
    --accent2: #a777e3;
    --cardBackground: rgba(255, 255, 255, 0.8);
    --border: rgba(0, 0, 0, 0.1);
  }

  [data-theme="dark"] {
    --background: #1a1a1a;
    --text: #ffffff;
    --primary: #6e8efb;
    --secondary: #a0a0a0;
    --accent1: #6e8efb;
    --accent2: #a777e3;
    --cardBackground: rgba(255, 255, 255, 0.05);
    --border: rgba(255, 255, 255, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background);
    color: var(--text);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
    background: none;
    outline: none;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .react-colorful {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1;
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }

  /* Toast Styles */
  .Toastify__toast {
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: inherit;
    background: var(--cardBackground) !important;
    color: var(--text) !important;
  }

  .Toastify__toast--success {
    border-left: 4px solid #10B981;
  }

  .Toastify__toast--error {
    border-left: 4px solid #EF4444;
  }

  .Toastify__toast--info {
    border-left: 4px solid #3B82F6;
  }

  .Toastify__toast--warning {
    border-left: 4px solid #F59E0B;
  }

  .Toastify__close-button {
    color: var(--text) !important;
    opacity: 0.7;
  }

  .Toastify__progress-bar {
    background: var(--accent1) !important;
  }
`;

export default GlobalStyle; 