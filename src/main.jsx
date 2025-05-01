import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/global';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          color: 'red', 
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          marginTop: '50px'
        }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.toString()}</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <GlobalStyle />
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Inter, sans-serif; text-align: center; margin-top: 50px">
      <h1>Failed to start application</h1>
      <p>${error.toString()}</p>
      <button onclick="window.location.reload()">Reload</button>
    </div>
  `;
}